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
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useCloudSync } from '@/hooks/use-cloud-sync';
import { useFlowNautStore } from '@/store/flownaut-store';
import type { InsightFrequency, WeekStart } from '@/types/flownaut';

interface SettingsProps {
  onClose: () => void;
  onEditProfile?: () => void;
}

type SettingsSection = 'main' | 'profile' | 'cloud' | 'auth' | 'reset' | 'delete' | 'habits' | 'experience' | 'privacy' | 'about' | 'google-cloud';

const PERSONALITY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  rhythm: {
    morning: 'You tend to feel most alive in the morning hours',
    evening: 'You come alive as the day winds down',
    flexible: 'Your rhythm flows naturally with the day',
  },
  energy: {
    steady: 'Your energy flows steadily throughout the day',
    bursts: 'You work in bursts of intense energy',
    waves: 'Your energy moves in natural waves',
  },
  motivation: {
    internal: 'You\'re guided by an inner sense of what matters',
    external: 'Goals and visible outcomes energize you',
    mixed: 'You balance inner values with external goals',
  },
  approach: {
    structured: 'You find comfort in gentle structure',
    spontaneous: 'You prefer following what feels right',
    adaptive: 'You adapt your approach to each situation',
  },
  focus: {
    deep: 'You prefer deep focus on one thing at a time',
    varied: 'You thrive with variety and switching tasks',
    contextual: 'Your focus adapts to what\'s needed',
  },
  recovery: {
    solitude: 'Quiet time restores your energy',
    social: 'Being with others recharges you',
    mixed: 'You balance solitude and connection',
  },
  pace: {
    slow: 'A deliberate, unhurried pace suits you',
    moderate: 'You find a balanced rhythm',
    fast: 'You thrive with quick, dynamic movement',
  },
};

const INSIGHT_DESCRIPTIONS: Record<InsightFrequency, string> = {
  rare: 'About once a month — quiet observation',
  occasional: 'Every 1-2 weeks — gentle reflections',
  weekly: 'Weekly — regular self-observation prompts',
};

export function Settings({ onClose, onEditProfile }: SettingsProps) {
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
  const setGlobalReminders = useFlowNautStore((s) => s.setGlobalReminders);
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
      PERSONALITY_DESCRIPTIONS.rhythm[personality.rhythm],
      PERSONALITY_DESCRIPTIONS.energy[personality.energy],
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
      ← Back
    </button>
  );

  const renderMain = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Profile Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Profile</h3>
        <SettingsRow 
          icon={User} 
          label="Your Profile" 
          sublabel={isAuthenticated ? `Synced as ${userEmail}` : 'View & edit your snapshot'}
          onClick={() => setSection('profile')}
        />
      </div>

      {/* Habits & Reminders */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Habits & Reminders</h3>
        <SettingsRow 
          icon={preferences.globalRemindersEnabled ? Bell : BellOff} 
          label="Reminders" 
          sublabel="Gentle reminders, if you want them"
          onClick={() => setSection('habits')}
        />
      </div>

      {/* App Experience */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">App Experience</h3>
        <SettingsRow 
          icon={Sparkles} 
          label="Insights & Reflections" 
          sublabel="How often reflections appear"
          onClick={() => setSection('experience')}
        />
      </div>

      {/* Data & Privacy */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Data & Privacy</h3>
        <SettingsRow 
          icon={Shield} 
          label="Your Data" 
          sublabel="Export, import, or manage your data"
          onClick={() => setSection('privacy')}
        />
      </div>

      {/* Support & About */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Support</h3>
        <SettingsRow 
          icon={HelpCircle} 
          label="Help & About" 
          sublabel="Learn how this app works"
          onClick={() => setSection('about')}
        />
      </div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      {/* Profile Summary */}
      {personality && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-2">Your current snapshot</p>
          <p className="text-sm text-foreground">{getPersonalitySummary()}</p>
          <p className="text-xs text-muted-foreground mt-3 italic">
            This reflects how you currently tend to approach habits.
          </p>
        </div>
      )}

      <SettingsRow 
        icon={Edit3} 
        label="Revisit Questions" 
        sublabel="You can revisit this anytime"
        onClick={handleEditProfile}
      />

      <SettingsRow 
        icon={RefreshCw} 
        label="Reset Profile" 
        sublabel="Start fresh. Nothing carries over."
        onClick={() => setSection('reset')}
      />

      {isAuthenticated && (
        <SettingsRow 
          icon={Trash2} 
          label="Delete Everywhere" 
          sublabel="Removes your data from this device and the cloud"
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
        <h3 className="font-medium text-foreground">Reminders</h3>
        <p className="text-sm text-muted-foreground">Gentle reminders, if you want them.</p>
      </div>

      {/* Global toggle */}
      <div className="p-4 rounded-xl bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm text-foreground">Enable reminders</p>
            <p className="text-xs text-muted-foreground">Uses your device's notification settings</p>
          </div>
        </div>
        <Switch
          checked={preferences.globalRemindersEnabled}
          onCheckedChange={setGlobalReminders}
        />
      </div>

      {/* Habit count */}
      <div className="p-4 rounded-xl bg-secondary/30 text-center">
        <p className="text-2xl font-serif text-foreground">{habits.length}</p>
        <p className="text-xs text-muted-foreground">habits you're observing</p>
        <p className="text-xs text-muted-foreground mt-1">
          ({habits.filter(h => !h.isResting).length} active, {habits.filter(h => h.isResting).length} resting)
        </p>
      </div>

      <BackButton />
    </motion.div>
  );

  const renderExperience = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
      <div className="text-center mb-4">
        <h3 className="font-medium text-foreground">Insights & Reflections</h3>
        <p className="text-sm text-muted-foreground">How often you'd like reflections to appear.</p>
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
            <p className="font-medium text-sm text-foreground capitalize">{freq}</p>
            <p className="text-xs text-muted-foreground mt-1">{INSIGHT_DESCRIPTIONS[freq]}</p>
          </button>
        ))}
      </div>

      {/* Info about insight types */}
      <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
        <p className="text-xs font-medium text-foreground">Types of reflections:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• <span className="font-medium">Patterns</span> — observing trends over time</li>
          <li>• <span className="font-medium">Connections</span> — highlighting possible links</li>
          <li>• <span className="font-medium">Prompts</span> — gentle questions for introspection</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2 italic">
          Never prescriptive. Never "you should". Just observations.
        </p>
      </div>

      {/* Week Start */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Week starts on</label>
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
              {day.charAt(0).toUpperCase() + day.slice(1)}
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
        <h3 className="font-medium text-foreground">Your Data</h3>
        <p className="text-sm text-muted-foreground">Your data belongs to you.</p>
      </div>

      {/* Data Overview */}
      <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
        <p className="text-sm font-medium text-foreground">Stored locally</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• {habits.length} habits</li>
          <li>• {entries.length} daily entries</li>
          <li>• Personality profile</li>
          <li>• App preferences</li>
        </ul>
        {isAuthenticated && (
          <>
            <p className="text-sm font-medium text-foreground mt-3">Stored in cloud</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Profile & habits</li>
              {syncLogsEnabled && <li>• Daily entries (opt-in)</li>}
            </ul>
          </>
        )}
      </div>

      {/* Google Cloud sync (placeholder) */}
      <SettingsRow 
        icon={Cloud} 
        label="Connect to Google Drive" 
        sublabel="Save your data to Google Cloud"
        onClick={() => setSection('google-cloud')}
      />

      <SettingsRow 
        icon={Download} 
        label="Export Data" 
        sublabel="Download as JSON"
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
          label="Import Data" 
          sublabel="Restore from a previous export"
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
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleClearLogs} className="flex-1">
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <SettingsRow 
            icon={Trash2} 
            label="Clear Local Logs" 
            sublabel="Deletes local entries only"
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
        <h3 className="font-serif text-lg font-medium text-foreground">FlowNaut</h3>
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>

      <div className="p-4 rounded-xl bg-secondary/30">
        <p className="text-sm text-foreground italic text-center">
          "I observe myself – I don't judge myself."
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          A self-observation tool focused on awareness and personal fit, not discipline or optimization.
        </p>
      </div>

      <SettingsRow 
        icon={HelpCircle} 
        label="How This App Works" 
        sublabel="Short explanations of core ideas"
        onClick={() => {}}
      />

      <SettingsRow 
        icon={MessageCircle} 
        label="Contact Support" 
        sublabel="We'd love to hear from you"
        onClick={() => {}}
      />

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
        <h3 className="text-lg font-serif font-medium text-foreground">Reset Profile</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Start fresh. Nothing carries over.
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
            <Button onClick={() => setConfirmReset(false)} variant="outline" className="flex-1">Cancel</Button>
            <Button onClick={handleSoftReset} variant="destructive" className="flex-1">Reset</Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleSoftReset} variant="outline" className="w-full">Reset profile</Button>
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
        <h3 className="text-lg font-serif font-medium text-foreground">Delete Everywhere</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Removes your data from this device and the cloud.
        </p>
      </div>

      {confirmDelete ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-destructive font-medium">This is permanent.</p>
          <div className="flex gap-2">
            <Button onClick={() => setConfirmDelete(false)} variant="outline" className="flex-1">Cancel</Button>
            <Button onClick={handleHardDelete} variant="destructive" className="flex-1">Delete everything</Button>
          </div>
        </div>
      ) : (
        <Button onClick={handleHardDelete} variant="destructive" className="w-full">Delete everywhere</Button>
      )}

      <BackButton to="profile" />
    </motion.div>
  );

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
            {section === 'main' && 'Settings'}
            {section === 'profile' && 'Your Profile'}
            {section === 'habits' && 'Reminders'}
            {section === 'experience' && 'Insights'}
            {section === 'privacy' && 'Data & Privacy'}
            {section === 'about' && 'About'}
            {section === 'auth' && 'Cloud Sync'}
            {section === 'cloud' && 'Cloud Sync'}
            {section === 'google-cloud' && 'Google Drive'}
            {section === 'reset' && 'Reset'}
            {section === 'delete' && 'Delete'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {section === 'main' && renderMain()}
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
