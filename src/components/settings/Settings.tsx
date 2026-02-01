import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cloud, 
  CloudOff, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  ChevronRight,
  Leaf,
  AlertTriangle,
  Check,
  X,
  User,
  Bell,
  BellOff,
  Palette,
  Shield,
  HelpCircle,
  Download,
  Upload,
  Eye,
  Calendar,
  MessageCircle,
  ExternalLink,
  Edit3,
  Sparkles,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useCloudSync } from '@/hooks/use-cloud-sync';
import { useFlowNautStore } from '@/store/flownaut-store';
import { useTranslations, useSetLanguage, useLanguage } from '@/hooks/use-translations';
import { LANGUAGE_OPTIONS, type SupportedLanguage } from '@/lib/i18n/translations';
import type { InsightFrequency, WeekStart } from '@/types/flownaut';

interface SettingsProps {
  onClose: () => void;
  onEditProfile?: () => void;
}

type SettingsSection = 'main' | 'profile' | 'cloud' | 'auth' | 'reset' | 'delete' | 'habits' | 'experience' | 'privacy' | 'about' | 'google-cloud' | 'language';

const PERSONALITY_DESCRIPTIONS: Record<string, Record<string, Record<SupportedLanguage, string>>> = {
  rhythm: {
    morning: {
      en: 'You tend to feel most alive in the morning hours',
      es: 'Tiendes a sentirte más vivo en las horas de la mañana',
      de: 'Du fühlst dich in den Morgenstunden am lebendigsten',
    },
    evening: {
      en: 'You come alive as the day winds down',
      es: 'Cobras vida cuando el día termina',
      de: 'Du wirst lebendig, wenn der Tag ausklingt',
    },
    flexible: {
      en: 'Your rhythm flows naturally with the day',
      es: 'Tu ritmo fluye naturalmente con el día',
      de: 'Dein Rhythmus fließt natürlich mit dem Tag',
    },
  },
  energy: {
    steady: {
      en: 'Your energy flows steadily throughout the day',
      es: 'Tu energía fluye constantemente durante el día',
      de: 'Deine Energie fließt stetig durch den Tag',
    },
    bursts: {
      en: 'You work in bursts of intense energy',
      es: 'Trabajas en ráfagas de energía intensa',
      de: 'Du arbeitest in intensiven Energieschüben',
    },
    waves: {
      en: 'Your energy moves in natural waves',
      es: 'Tu energía se mueve en oleadas naturales',
      de: 'Deine Energie bewegt sich in natürlichen Wellen',
    },
  },
  motivation: {
    internal: {
      en: "You're guided by an inner sense of what matters",
      es: 'Te guías por un sentido interno de lo que importa',
      de: 'Du wirst von einem inneren Sinn für das Wichtige geleitet',
    },
    external: {
      en: 'Goals and visible outcomes energize you',
      es: 'Las metas y resultados visibles te energizan',
      de: 'Ziele und sichtbare Ergebnisse energetisieren dich',
    },
    mixed: {
      en: 'You balance inner values with external goals',
      es: 'Equilibras valores internos con metas externas',
      de: 'Du balancierst innere Werte mit äußeren Zielen',
    },
  },
  approach: {
    structured: {
      en: 'You find comfort in gentle structure',
      es: 'Encuentras comodidad en una estructura suave',
      de: 'Du findest Komfort in sanfter Struktur',
    },
    spontaneous: {
      en: 'You prefer following what feels right',
      es: 'Prefieres seguir lo que se siente correcto',
      de: 'Du bevorzugst dem zu folgen, was sich richtig anfühlt',
    },
    adaptive: {
      en: 'You adapt your approach to each situation',
      es: 'Adaptas tu enfoque a cada situación',
      de: 'Du passt deinen Ansatz an jede Situation an',
    },
  },
  focus: {
    deep: {
      en: 'You prefer deep focus on one thing at a time',
      es: 'Prefieres un enfoque profundo en una cosa a la vez',
      de: 'Du bevorzugst tiefen Fokus auf eine Sache',
    },
    varied: {
      en: 'You thrive with variety and switching tasks',
      es: 'Prosperas con variedad y cambio de tareas',
      de: 'Du blühst auf mit Abwechslung und Aufgabenwechsel',
    },
    contextual: {
      en: "Your focus adapts to what's needed",
      es: 'Tu enfoque se adapta a lo que se necesita',
      de: 'Dein Fokus passt sich dem Bedarf an',
    },
  },
  recovery: {
    solitude: {
      en: 'Quiet time restores your energy',
      es: 'El tiempo tranquilo restaura tu energía',
      de: 'Ruhige Zeit stellt deine Energie wieder her',
    },
    social: {
      en: 'Being with others recharges you',
      es: 'Estar con otros te recarga',
      de: 'Mit anderen zusammen zu sein lädt dich auf',
    },
    mixed: {
      en: 'You balance solitude and connection',
      es: 'Equilibras soledad y conexión',
      de: 'Du balancierst Einsamkeit und Verbundenheit',
    },
  },
  pace: {
    slow: {
      en: 'A deliberate, unhurried pace suits you',
      es: 'Un ritmo deliberado y sin prisa te sienta bien',
      de: 'Ein bedachtes, ungehetztes Tempo passt zu dir',
    },
    moderate: {
      en: 'You find a balanced rhythm',
      es: 'Encuentras un ritmo equilibrado',
      de: 'Du findest einen ausgewogenen Rhythmus',
    },
    fast: {
      en: 'You thrive with quick, dynamic movement',
      es: 'Prosperas con movimientos rápidos y dinámicos',
      de: 'Du blühst mit schneller, dynamischer Bewegung auf',
    },
  },
};

export function Settings({ onClose, onEditProfile }: SettingsProps) {
  const t = useTranslations();
  const currentLanguage = useLanguage();
  const setLanguage = useSetLanguage();
  
  const [section, setSection] = useState<SettingsSection>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmClearLogs, setConfirmClearLogs] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isAuthenticated,
    email: userEmail,
    isSyncing,
    syncLogsEnabled,
    lastError,
    signUp,
    signIn,
    logOut,
    softReset,
    hardDelete,
    toggleLogSync,
    syncToCloud,
  } = useCloudSync();

  const personality = useFlowNautStore((s) => s.personality);
  const preferences = useFlowNautStore((s) => s.preferences);
  const habits = useFlowNautStore((s) => s.habits);
  const entries = useFlowNautStore((s) => s.entries);
  const updatePreferences = useFlowNautStore((s) => s.updatePreferences);
  const clearLocalLogs = useFlowNautStore((s) => s.clearLocalLogs);
  const exportData = useFlowNautStore((s) => s.exportData);
  const importData = useFlowNautStore((s) => s.importData);
  const reopenOnboarding = useFlowNautStore((s) => s.reopenOnboarding);

  const handleAuth = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    const result = authMode === 'signin' 
      ? await signIn(email, password)
      : await signUp(email, password);
    setIsLoading(false);
    if (result.success) {
      setSection('cloud');
      setEmail('');
      setPassword('');
    }
  };

  const handleSoftReset = () => {
    if (confirmReset) {
      softReset();
      onClose();
    } else {
      setConfirmReset(true);
    }
  };

  const handleHardDelete = async () => {
    if (confirmDelete) {
      await hardDelete();
      onClose();
    } else {
      setConfirmDelete(true);
    }
  };

  const handleClearLogs = () => {
    if (confirmClearLogs) {
      clearLocalLogs();
      setConfirmClearLogs(false);
    } else {
      setConfirmClearLogs(true);
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flownaut-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importData(content);
      if (result.success) {
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError(result.error || 'Import failed');
      }
    };
    reader.onerror = () => {
      setImportError('Could not read the file');
    };
    reader.readAsText(file);

    // Reset input
    e.target.value = '';
  };

  const handleEditProfile = () => {
    reopenOnboarding();
    onClose();
  };

  const getPersonalitySummary = () => {
    if (!personality) return null;
    const summaryParts = [
      PERSONALITY_DESCRIPTIONS.rhythm[personality.rhythm]?.[currentLanguage],
      PERSONALITY_DESCRIPTIONS.energy[personality.energy]?.[currentLanguage],
    ].filter(Boolean);
    return summaryParts.slice(0, 2).join('. ') + '.';
  };

  const SettingsRow = ({ 
    icon: Icon, 
    label, 
    sublabel, 
    onClick,
    rightContent,
    destructive = false,
  }: { 
    icon: any; 
    label: string; 
    sublabel?: string;
    onClick?: () => void;
    rightContent?: React.ReactNode;
    destructive?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`w-full p-4 rounded-xl transition-colors flex items-center justify-between ${
        onClick ? 'hover:bg-secondary/80' : ''
      } ${destructive ? 'bg-destructive/5' : 'bg-secondary/50'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${destructive ? 'text-destructive' : 'text-muted-foreground'}`} />
        <div className="text-left">
          <p className={`font-medium text-sm ${destructive ? 'text-destructive' : 'text-foreground'}`}>{label}</p>
          {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
        </div>
      </div>
      {rightContent || (onClick && <ChevronRight className="w-4 h-4 text-muted-foreground" />)}
    </button>
  );

  const BackButton = ({ to = 'main' }: { to?: SettingsSection }) => (
    <button
      onClick={() => { setSection(to); setConfirmReset(false); setConfirmDelete(false); }}
      className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
    >
      ← {t.common.back}
    </button>
  );

  const currentLanguageOption = LANGUAGE_OPTIONS.find(l => l.value === currentLanguage);

  const renderMain = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Profile Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.sections.profile}</h3>
        <SettingsRow 
          icon={User} 
          label={t.settings.profile.title} 
          sublabel={isAuthenticated ? `${t.settings.profile.syncedAs} ${userEmail}` : t.settings.profile.subtitle}
          onClick={() => setSection('profile')}
        />
      </div>

      {/* Language */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.language.title}</h3>
        <SettingsRow 
          icon={Globe} 
          label={currentLanguageOption?.label || 'English'}
          sublabel={t.settings.language.subtitle}
          onClick={() => setSection('language')}
          rightContent={<span className="text-xl mr-2">{currentLanguageOption?.flag}</span>}
        />
      </div>

      {/* Habits Overview */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.sections.habitsReminders}</h3>
        <SettingsRow 
          icon={Leaf} 
          label={t.settings.habits.title} 
          sublabel={`${habits.length} ${t.settings.habits.habitsObserving}`}
          onClick={() => setSection('habits')}
        />
      </div>

      {/* App Experience */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.sections.appExperience}</h3>
        <SettingsRow 
          icon={Sparkles} 
          label={t.settings.experience.title} 
          sublabel={t.settings.experience.subtitle}
          onClick={() => setSection('experience')}
        />
      </div>

      {/* Data & Privacy */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.sections.dataPrivacy}</h3>
        <SettingsRow 
          icon={Shield} 
          label={t.settings.privacy.title} 
          sublabel={t.settings.privacy.subtitle}
          onClick={() => setSection('privacy')}
        />
      </div>

      {/* Support & About */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">{t.settings.sections.support}</h3>
        <SettingsRow 
          icon={HelpCircle} 
          label={t.settings.about.title} 
          sublabel={t.settings.about.subtitle}
          onClick={() => setSection('about')}
        />
      </div>
    </motion.div>
  );

  const renderLanguage = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">{t.settings.language.title}</h3>
        <p className="text-sm text-muted-foreground">{t.settings.language.subtitle}</p>
      </div>

      <div className="space-y-3">
        {LANGUAGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setLanguage(option.value);
              setSection('main');
            }}
            className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${
              currentLanguage === option.value
                ? 'bg-primary/10 border-2 border-primary/30'
                : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary/80'
            }`}
          >
            <span className="text-2xl">{option.flag}</span>
            <span className="font-medium text-foreground">{option.label}</span>
            {currentLanguage === option.value && (
              <Check className="w-5 h-5 text-primary ml-auto" />
            )}
          </button>
        ))}
      </div>

      <BackButton />
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      {/* Profile Summary */}
      {personality && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-2">{t.settings.profile.currentSnapshot}</p>
          <p className="text-sm text-foreground">{getPersonalitySummary()}</p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            {t.settings.profile.snapshotNote}
          </p>
        </div>
      )}

      <SettingsRow 
        icon={Edit3} 
        label={t.settings.profile.revisitQuestions} 
        sublabel={t.settings.profile.revisitSubtitle}
        onClick={handleEditProfile}
      />

      <SettingsRow 
        icon={RefreshCw} 
        label={t.settings.profile.resetProfile} 
        sublabel={t.settings.profile.resetSubtitle}
        onClick={() => setSection('reset')}
      />

      {isAuthenticated && (
        <SettingsRow 
          icon={Trash2} 
          label={t.settings.profile.deleteEverywhere} 
          sublabel={t.settings.profile.deleteSubtitle}
          onClick={() => setSection('delete')}
          destructive
        />
      )}

      <BackButton />
    </motion.div>
  );

  const renderHabits = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">{t.settings.habits.title}</h3>
        <p className="text-sm text-muted-foreground">{t.settings.habits.subtitle}</p>
      </div>

      {/* Habit count */}
      <div className="p-4 rounded-xl bg-secondary/30 text-center">
        <p className="text-2xl font-serif text-foreground">{habits.length}</p>
        <p className="text-xs text-muted-foreground">{t.settings.habits.habitsObserving}</p>
        <p className="text-xs text-muted-foreground mt-1">
          ({habits.filter(h => !h.isResting).length} {t.settings.habits.active}, {habits.filter(h => h.isResting).length} {t.settings.habits.resting})
        </p>
      </div>

      <BackButton />
    </motion.div>
  );

  const renderExperience = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">{t.settings.experience.title}</h3>
        <p className="text-sm text-muted-foreground">{t.settings.experience.subtitle}</p>
      </div>

      {/* Insight Frequency */}
      <div className="space-y-3">
        {(['rare', 'occasional', 'weekly'] as InsightFrequency[]).map((freq) => (
          <button
            key={freq}
            onClick={() => updatePreferences({ insightFrequency: freq })}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              preferences.insightFrequency === freq
                ? 'bg-primary/10 border-2 border-primary/30'
                : 'bg-secondary/50 border-2 border-transparent hover:bg-secondary/80'
            }`}
          >
            <p className="font-medium text-sm text-foreground">{t.settings.experience.insightFrequency[freq]}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.settings.experience.insightFrequency[`${freq}Desc` as keyof typeof t.settings.experience.insightFrequency]}</p>
          </button>
        ))}
      </div>

      {/* Info about insight types */}
      <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
        <p className="text-xs font-medium text-foreground">{t.settings.experience.reflectionTypes}</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• <span className="font-medium">{t.settings.experience.patterns}</span> — {t.settings.experience.patternsDesc}</li>
          <li>• <span className="font-medium">{t.settings.experience.connections}</span> — {t.settings.experience.connectionsDesc}</li>
          <li>• <span className="font-medium">{t.settings.experience.prompts}</span> — {t.settings.experience.promptsDesc}</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2 italic">
          {t.settings.experience.neverPrescriptive}
        </p>
      </div>

      {/* Week Start */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">{t.settings.experience.weekStartsOn}</label>
        <div className="flex gap-2">
          {(['monday', 'sunday'] as WeekStart[]).map((day) => (
            <button
              key={day}
              onClick={() => updatePreferences({ weekStart: day })}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                preferences.weekStart === day
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              <Calendar className="w-4 h-4" />
              {day === 'monday' ? t.settings.experience.monday : t.settings.experience.sunday}
            </button>
          ))}
        </div>
      </div>

      <BackButton />
    </motion.div>
  );

  const renderPrivacy = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">{t.settings.privacy.title}</h3>
        <p className="text-sm text-muted-foreground">{t.settings.privacy.subtitle}</p>
      </div>

      {/* Data Overview */}
      <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
        <p className="text-sm font-medium text-foreground">{t.settings.privacy.storedLocally}</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• {habits.length} {t.settings.privacy.habits}</li>
          <li>• {entries.length} {t.settings.privacy.dailyEntries}</li>
          <li>• {t.settings.privacy.personalityProfile}</li>
          <li>• {t.settings.privacy.appPreferences}</li>
        </ul>
        {isAuthenticated && (
          <>
            <p className="text-sm font-medium text-foreground mt-3">{t.settings.privacy.storedInCloud}</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• {t.settings.privacy.profileAndHabits}</li>
              {syncLogsEnabled && <li>• {t.settings.privacy.dailyEntriesOptIn}</li>}
            </ul>
          </>
        )}
      </div>

      {/* Google Cloud sync (placeholder) */}
      <SettingsRow 
        icon={Cloud} 
        label={t.settings.privacy.googleDrive} 
        sublabel={t.settings.privacy.googleDriveSubtitle}
        onClick={() => setSection('google-cloud')}
      />

      <SettingsRow 
        icon={Download} 
        label={t.settings.privacy.exportData} 
        sublabel={t.settings.privacy.exportSubtitle}
        onClick={handleExport}
      />

      {/* Import Data */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
      />
      <div className="space-y-2">
        <SettingsRow 
          icon={Upload} 
          label={t.settings.privacy.importData} 
          sublabel={t.settings.privacy.importSubtitle}
          onClick={handleImportClick}
        />
        {importError && (
          <p className="text-xs text-destructive text-center">{importError}</p>
        )}
        {importSuccess && (
          <p className="text-xs text-primary text-center">Data imported successfully!</p>
        )}
      </div>

      {/* Clear Local Logs */}
      <div className="space-y-2">
        {confirmClearLogs ? (
          <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
            <p className="text-sm text-foreground">Clear all daily entries? Cloud data remains untouched.</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setConfirmClearLogs(false)} className="flex-1">
                {t.common.cancel}
              </Button>
              <Button variant="destructive" onClick={handleClearLogs} className="flex-1">
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <SettingsRow 
            icon={Trash2} 
            label={t.settings.privacy.clearLogs} 
            sublabel={t.settings.privacy.clearLogsSubtitle}
            onClick={handleClearLogs}
          />
        )}
      </div>

      <a 
        href="#" 
        className="flex items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
      >
        <Eye className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-sm text-foreground">Privacy Policy</p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
      </a>

      <BackButton />
    </motion.div>
  );

  const renderGoogleCloud = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Cloud className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">Google Drive Sync</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Save your data to Google Drive for additional backup.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
        <p className="text-sm text-foreground">This feature is coming soon.</p>
        <p className="text-xs text-muted-foreground">
          In the meantime, you can use the Export/Import functions to backup your data manually.
        </p>
      </div>

      <BackButton to="privacy" />
    </motion.div>
  );

  const renderAbout = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-lg font-medium text-foreground">HabitNaut</h3>
        <p className="text-xs text-muted-foreground">{t.settings.about.version} 1.0.0</p>
      </div>

      <div className="p-4 rounded-xl bg-secondary/30">
        <p className="text-sm text-foreground italic text-center">
          "I observe myself – I don't judge myself."
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          {t.settings.about.philosophyText}
        </p>
      </div>

      <div className="p-4 rounded-xl bg-secondary/50">
        <p className="text-sm text-foreground">
          {t.settings.about.hobbyMessage}
        </p>
        <p className="text-sm text-foreground mt-3">
          <a 
            href="mailto:tj.kraj23@gmail.com" 
            className="text-primary hover:underline"
          >
            tj.kraj23@gmail.com
          </a>
        </p>
        <p className="text-sm text-muted-foreground mt-3 italic">
          {t.settings.about.warmRegards} Tom
        </p>
      </div>

      <BackButton />
    </motion.div>
  );

  const renderAuth = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Cloud className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">Save to Cloud</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Keeps your profile safe if you change devices.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              authMode === 'signin' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              authMode === 'signup' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
            }`}
          >
            Create account
          </button>
        </div>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondary border-border"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-secondary border-border"
        />

        {lastError && <p className="text-sm text-destructive">{lastError}</p>}

        <Button onClick={handleAuth} disabled={isLoading || !email || !password} className="w-full" variant="gentle">
          {isLoading ? 'Please wait...' : authMode === 'signin' ? 'Sign in' : 'Create account'}
        </Button>
      </div>

      <BackButton to="profile" />
    </motion.div>
  );

  const renderCloud = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Check className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">Connected</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-secondary flex items-center justify-between">
        <div>
          <p className="font-medium text-foreground text-sm">Sync habit logs</p>
          <p className="text-xs text-muted-foreground">Save your daily entries to cloud</p>
        </div>
        <Switch checked={syncLogsEnabled} onCheckedChange={toggleLogSync} />
      </div>

      <Button onClick={syncToCloud} disabled={isSyncing} className="w-full" variant="outline">
        {isSyncing ? 'Syncing...' : 'Sync now'}
      </Button>

      <button
        onClick={logOut}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>

      <BackButton to="profile" />
    </motion.div>
  );

  const renderReset = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
          <Leaf className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">{t.settings.profile.resetProfile}</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          {t.settings.profile.resetSubtitle}
        </p>
        {isAuthenticated && (
          <p className="text-xs text-muted-foreground mt-3 px-4 py-2 bg-secondary rounded-lg inline-block">
            Your cloud data remains untouched.
          </p>
        )}
      </div>

      {confirmReset ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-foreground font-medium">Are you sure?</p>
          <div className="flex gap-2">
            <Button onClick={() => setConfirmReset(false)} variant="outline" className="flex-1">{t.common.cancel}</Button>
            <Button onClick={handleSoftReset} variant="destructive" className="flex-1">Reset</Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleSoftReset} variant="outline" className="w-full">{t.settings.profile.resetProfile}</Button>
      )}

      <BackButton to="profile" />
    </motion.div>
  );

  const renderDelete = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-destructive" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">{t.settings.profile.deleteEverywhere}</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          {t.settings.profile.deleteSubtitle}
        </p>
      </div>

      {confirmDelete ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-destructive font-medium">This is permanent.</p>
          <div className="flex gap-2">
            <Button onClick={() => setConfirmDelete(false)} variant="outline" className="flex-1">{t.common.cancel}</Button>
            <Button onClick={handleHardDelete} variant="destructive" className="flex-1">Delete everything</Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleHardDelete} variant="destructive" className="w-full">{t.settings.profile.deleteEverywhere}</Button>
      )}

      <BackButton to="profile" />
    </motion.div>
  );

  const getSectionTitle = () => {
    switch (section) {
      case 'main': return t.settings.title;
      case 'profile': return t.settings.profile.title;
      case 'habits': return t.settings.habits.title;
      case 'experience': return t.settings.experience.title;
      case 'privacy': return t.settings.privacy.title;
      case 'about': return t.settings.about.title;
      case 'language': return t.settings.language.title;
      case 'auth': return 'Cloud Sync';
      case 'cloud': return 'Cloud Sync';
      case 'google-cloud': return 'Google Drive';
      case 'reset': return t.settings.profile.resetProfile;
      case 'delete': return t.settings.profile.deleteEverywhere;
      default: return t.settings.title;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-sm max-h-[85vh] overflow-y-auto bg-card border border-border rounded-3xl shadow-elevated"
      >
        <div className="sticky top-0 bg-card border-b border-border/50 p-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-serif font-medium text-foreground">
            {getSectionTitle()}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {section === 'main' && renderMain()}
            {section === 'language' && renderLanguage()}
            {section === 'profile' && renderProfile()}
            {section === 'habits' && renderHabits()}
            {section === 'experience' && renderExperience()}
            {section === 'privacy' && renderPrivacy()}
            {section === 'about' && renderAbout()}
            {section === 'auth' && renderAuth()}
            {section === 'cloud' && renderCloud()}
            {section === 'google-cloud' && renderGoogleCloud()}
            {section === 'reset' && renderReset()}
            {section === 'delete' && renderDelete()}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
