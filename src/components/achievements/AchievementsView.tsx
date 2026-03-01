import { motion } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations } from '@/hooks/use-translations';
import { achievementDefinitions } from '@/lib/achievements/achievement-definitions';
import type { AchievementCategory, AchievementKey } from '@/types/achievements';

interface AchievementsViewProps {
  onClose: () => void;
}

const categoryOrder: AchievementCategory[] = ['A', 'B', 'C', 'D', 'E', 'F'];

export function AchievementsView({ onClose }: AchievementsViewProps) {
  const unlocked = useFlowNautStore((s) => s.unlockedAchievements);
  const t = useTranslations();
  const at = t.achievements;
  const lang = useFlowNautStore((s) => s.preferences.language);

  const categoryNames: Record<AchievementCategory, string> = {
    A: at.categoryA,
    B: at.categoryB,
    C: at.categoryC,
    D: at.categoryD,
    E: at.categoryE,
    F: at.categoryF,
  };

  const unlockedCount = Object.keys(unlocked).length;
  const totalCount = achievementDefinitions.length;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      <div className="max-w-lg mx-auto px-5 pt-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-serif font-medium text-foreground">
              {at.title}
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {at.subtitle}
        </p>

        {/* Summary */}
        <div className="mb-8 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground text-center">
            {at.unlocked.replace('{count}', String(unlockedCount)).replace('{total}', String(totalCount))}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categoryOrder.map((cat) => {
            const defs = achievementDefinitions.filter(d => d.category === cat);
            return (
              <section key={cat}>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  {categoryNames[cat]}
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {defs.map((def) => {
                    const unlockedAt = unlocked[def.key];
                    const isUnlocked = !!unlockedAt;
                    const name = at.items[def.key]?.name || def.key;
                    const desc = at.items[def.key]?.description || '';

                    return (
                      <motion.div
                        key={def.key}
                        initial={false}
                        animate={isUnlocked ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                          isUnlocked
                            ? 'bg-primary/5 border-primary/20'
                            : 'bg-muted/30 border-border/30 opacity-60'
                        }`}
                      >
                        <span className="text-xl" role="img">
                          {isUnlocked ? def.emoji : '🔒'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {isUnlocked ? desc : '?'}
                          </p>
                          {isUnlocked && (
                            <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                              {formatDate(unlockedAt)}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
