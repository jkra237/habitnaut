import { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { useFlowNautStore } from '@/store/flownaut-store';
import { format, parseISO, subDays, eachDayOfInterval } from 'date-fns';

interface HabitTimelineProps {
  daysToShow?: number;
}

export function HabitTimeline({ daysToShow = 30 }: HabitTimelineProps) {
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);

  const chartData = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, daysToShow - 1);
    
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    return dateRange.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const entry = entries.find((e) => e.date === dateStr);
      
      const dayData: Record<string, any> = {
        date: dateStr,
        displayDate: format(date, 'MMM d'),
      };

      // Calculate completion rate for each habit
      habits.forEach((habit) => {
        const state = entry?.habits[habit.id];
        // done = 1, conscious-skip = 0.5, not-done/undefined = 0
        const value = state === 'done' ? 1 : state === 'conscious-skip' ? 0.5 : 0;
        dayData[habit.id] = value;
      });

      // Overall completion rate
      if (habits.length > 0) {
        const values = habits.map((h) => dayData[h.id] as number);
        dayData.overall = values.reduce((a, b) => a + b, 0) / habits.length;
      }

      return dayData;
    });
  }, [habits, entries, daysToShow]);

  // Generate colors for each habit
  const habitColors = useMemo(() => {
    const baseColors = [
      'hsl(var(--primary))',
      'hsl(var(--accent))',
      'hsl(152, 35%, 55%)',
      'hsl(32, 75%, 55%)',
      'hsl(200, 50%, 55%)',
    ];
    
    return habits.reduce((acc, habit, idx) => {
      acc[habit.id] = baseColors[idx % baseColors.length];
      return acc;
    }, {} as Record<string, string>);
  }, [habits]);

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <p className="text-muted-foreground text-sm">
          Add habits to see your timeline visualization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              opacity={0.5}
            />
            <XAxis 
              dataKey="displayDate" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[0, 1]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickFormatter={(value) => `${Math.round(value * 100)}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-elevated)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
              formatter={(value: number, name: string) => {
                const habit = habits.find((h) => h.id === name);
                const label = habit?.name || name;
                const displayValue = value === 1 ? 'Done' : value === 0.5 ? 'Skipped' : 'Not done';
                return [displayValue, label];
              }}
            />
            <Legend 
              formatter={(value) => {
                const habit = habits.find((h) => h.id === value);
                return habit?.name || value;
              }}
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            {habits.map((habit) => (
              <Line
                key={habit.id}
                type="monotone"
                dataKey={habit.id}
                stroke={habitColors[habit.id]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: habitColors[habit.id] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        {habits.slice(0, 4).map((habit) => {
          const habitEntries = chartData.filter((d) => d[habit.id] > 0).length;
          const percentage = Math.round((habitEntries / daysToShow) * 100);
          
          return (
            <div 
              key={habit.id}
              className="p-3 rounded-xl bg-secondary/50 border border-border/50"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{habit.emoji || '🌱'}</span>
                <span className="text-sm font-medium text-foreground truncate">
                  {habit.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Engaged {habitEntries} of {daysToShow} days ({percentage}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
