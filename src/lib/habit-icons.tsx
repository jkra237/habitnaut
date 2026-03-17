import {
  Sprout,
  Droplet,
  Moon,
  Heart,
  Book,
  Dumbbell,
  Music,
  Coffee,
  Activity,
  Brain,
  Target,
  Zap,
  Apple,
  Sun,
  type LucideIcon
} from 'lucide-react';

export type HabitIconName =
  | 'sprout'
  | 'droplet'
  | 'moon'
  | 'heart'
  | 'book'
  | 'dumbbell'
  | 'music'
  | 'coffee'
  | 'activity'
  | 'brain'
  | 'target'
  | 'zap'
  | 'apple'
  | 'sun';

export interface HabitIconOption {
  name: HabitIconName;
  icon: LucideIcon;
}

export const HABIT_ICON_OPTIONS: HabitIconOption[] = [
  { name: 'sprout', icon: Sprout },
  { name: 'droplet', icon: Droplet },
  { name: 'moon', icon: Moon },
  { name: 'heart', icon: Heart },
  { name: 'book', icon: Book },
  { name: 'dumbbell', icon: Dumbbell },
  { name: 'music', icon: Music },
  { name: 'coffee', icon: Coffee },
];

export const HABIT_ICON_MAP: Record<HabitIconName, LucideIcon> = {
  sprout: Sprout,
  droplet: Droplet,
  moon: Moon,
  heart: Heart,
  book: Book,
  dumbbell: Dumbbell,
  music: Music,
  coffee: Coffee,
  activity: Activity,
  brain: Brain,
  target: Target,
  zap: Zap,
  apple: Apple,
  sun: Sun,
};

interface HabitIconProps {
  iconName?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function HabitIcon({ iconName, className = "w-5 h-5", fallback }: HabitIconProps) {
  // If iconName is an emoji (legacy), display it as-is
  if (iconName && /\p{Emoji}/u.test(iconName)) {
    return <span className={className}>{iconName}</span>;
  }

  // Get the icon component from the map
  const IconComponent = iconName ? HABIT_ICON_MAP[iconName as HabitIconName] : null;

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  // Fallback: show default icon or provided fallback
  if (fallback) {
    return <>{fallback}</>;
  }

  return <Sprout className={className} />;
}
