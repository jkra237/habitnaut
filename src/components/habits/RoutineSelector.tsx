import { useTranslations } from '@/hooks/use-translations';
import type { RoutineFrequency } from '@/types/flownaut';

interface RoutineSelectorProps {
  selectedDays: number[];
  onDaysChange: (days: number[]) => void;
  frequency: RoutineFrequency;
  onFrequencyChange: (freq: RoutineFrequency) => void;
}

export function RoutineSelector({ selectedDays, onDaysChange, frequency, onFrequencyChange }: RoutineSelectorProps) {
  const t = useTranslations();

  const toggleDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      onDaysChange(selectedDays.filter((d) => d !== dayIndex));
    } else {
      onDaysChange([...selectedDays, dayIndex].sort());
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">{t.addHabitDialog.routineHint}</p>
      
      {/* Weekday selector */}
      <div className="flex gap-1.5">
        {t.addHabitDialog.weekdays.map((day, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggleDay(idx)}
            className={`flex-1 h-9 rounded-lg text-xs font-medium transition-all duration-200 ${
              selectedDays.includes(idx)
                ? 'bg-primary/20 border-2 border-primary text-primary'
                : 'bg-secondary border-2 border-transparent text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Frequency toggle */}
      {selectedDays.length > 0 && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onFrequencyChange('weekly')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              frequency === 'weekly'
                ? 'bg-primary/15 border border-primary/40 text-primary'
                : 'bg-secondary border border-transparent text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            {t.addHabitDialog.routineWeekly}
          </button>
          <button
            type="button"
            onClick={() => onFrequencyChange('monthly')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              frequency === 'monthly'
                ? 'bg-primary/15 border border-primary/40 text-primary'
                : 'bg-secondary border border-transparent text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            {t.addHabitDialog.routineMonthly}
          </button>
        </div>
      )}
    </div>
  );
}
