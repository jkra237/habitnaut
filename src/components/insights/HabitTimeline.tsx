import { useMemo, useState } from 'react';
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
import { format, parseISO, subDays, subMonths, subYears, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';
import { useTranslations } from '@/hooks/use-translations';

type TimeRange = 'week' | 'month' | 'year';

interface HabitTimelineProps {
  initialRange?: TimeRange;
}

export function HabitTimeline({ initialRange = 'month' }: HabitTimelineProps) {
  const t = useTranslations();
  const [timeRange, setTimeRange] = useState<TimeRange>(initialRange);
  const habits = useFlowNautStore((s) => s.getActiveHabits());
  const entries = useFlowNautStore((s) => s.entries);
  const weekStart = useFlowNautStore((s) => s.preferences.weekStart);

  const chartData = useMemo(() => {
    const endDate = new Date();
    let startDate: Date;
    let dateRange: Date[];
    let formatStr: string;
    let aggregation: 'day' | 'week' | 'month' = 'day';

    switch (timeRange) {
      case 'week':
        startDate = subDays(endDate, 6);
        dateRange = eachDayOfInterval({ start: startDate, end: endDate });
        formatStr = 'EEE';
        aggregation = 'day';
        break;
      case 'month':
        startDate = subDays(endDate, 29);
        dateRange = eachDayOfInterval({ start: startDate, end: endDate });
        formatStr = 'd';
        aggregation = 'day';
        break;
      case 'year':
        startDate = subMonths(endDate, 11);
        dateRange = eachMonthOfInterval({ start: startDate, end: endDate });
        formatStr = 'MMM';
        aggregation = 'month';
        break;
      default:
        startDate = subDays(endDate, 29);
        dateRange = eachDayOfInterval({ start: startDate, end: endDate });
        formatStr = 'd';
        aggregation = 'day';
    }

    if (aggregation === 'day') {
      return dateRange.map((date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        const entry = entries.find((e) => e.date === dateStr);
        
        const dayData: Record<string, any> = {
          date: dateStr,
          displayDate: format(date, formatStr),
        };

        habits.forEach((habit) => {
          const state = entry?.habits[habit.id];
          const value = state === 'done' ? 1 : state === 'conscious-skip' ? 0.5 : 0;
          dayData[habit.id] = value;
        });

        if (habits.length > 0) {
          const values = habits.map((h) => dayData[h.id] as number);
          dayData.overall = values.reduce((a, b) => a + b, 0) / habits.length;
        }

        return dayData;
      });
    } else {
      // Monthly aggregation for year view
      return dateRange.map((monthDate) => {
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthDate);
        const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
        
        const monthData: Record<string, any> = {
          date: format(monthDate, 'yyyy-MM'),
          displayDate: format(monthDate, formatStr),
        };

        habits.forEach((habit) => {
          let totalValue = 0;
          let daysWithData = 0;
          
          daysInMonth.forEach((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const entry = entries.find((e) => e.date === dateStr);
            const state = entry?.habits[habit.id];
            if (state) {
              totalValue += state === 'done' ? 1 : state === 'conscious-skip' ? 0.5 : 0;
              daysWithData++;
            }
          });
          
          monthData[habit.id] = daysWithData > 0 ? totalValue / daysWithData : 0;
        });

        if (habits.length > 0) {
          const values = habits.map((h) => monthData[h.id] as number);
          monthData.overall = values.reduce((a, b) => a + b, 0) / habits.length;
        }

        return monthData;
      });
    }
  }, [habits, entries, timeRange]);

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

  // Calculate engagement stats
  const stats = useMemo(() => {
    const totalDays = chartData.length;
    return habits.slice(0, 4).map((habit) => {
      const engagedDays = chartData.filter((d) => d[habit.id] > 0).length;
      const avgEngagement = chartData.reduce((sum, d) => sum + (d[habit.id] || 0), 0) / totalDays;
      return {
        habit,
        engagedDays,
        totalDays,
        percentage: Math.round(avgEngagement * 100),
      };
    });
  }, [habits, chartData]);

  if (habits.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <p className="text-muted-foreground text-sm">
          {t.timeline.addHabitsToSee}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Time range selector */}
      <div className="flex gap-2 justify-center">
        {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              timeRange === range
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {t.timeline[range]}
          </button>
        ))}
      </div>

      {/* Chart */}
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
              interval={timeRange === 'month' ? 4 : 'preserveStartEnd'}
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
                return [`${Math.round(value * 100)}%`, label];
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
                dot={timeRange === 'week'}
                activeDot={{ r: 4, fill: habitColors[habit.id] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ habit, engagedDays, totalDays, percentage }) => (
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
              {percentage}% {t.timeline.engagement} 
              {timeRange === 'year' ? ` (${t.timeline.avg})` : ` (${engagedDays}/${totalDays} ${t.timeline.days})`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}