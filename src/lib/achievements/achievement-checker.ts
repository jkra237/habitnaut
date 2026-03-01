import type { UserState } from '@/types/flownaut';
import type { AchievementKey } from '@/types/achievements';
import { achievementDefinitions } from './achievement-definitions';

export function checkAchievements(state: UserState): AchievementKey[] {
  return achievementDefinitions
    .filter(def => def.check(state))
    .map(def => def.key);
}
