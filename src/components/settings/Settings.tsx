import { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useCloudSync } from '@/hooks/use-cloud-sync';
import { useFlowNautStore } from '@/store/flownaut-store';

interface SettingsProps {
  onClose: () => void;
}

type SettingsView = 'main' | 'cloud' | 'auth' | 'reset' | 'delete';

export function Settings({ onClose }: SettingsProps) {
  const [view, setView] = useState<SettingsView>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const preferredTone = useFlowNautStore((s) => s.preferredTone);

  const handleAuth = async () => {
    if (!email || !password) return;
    setIsLoading(true);

    const result = authMode === 'signin' 
      ? await signIn(email, password)
      : await signUp(email, password);

    setIsLoading(false);
    if (result.success) {
      setView('cloud');
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

  const renderMainView = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      {/* Cloud Sync Section */}
      <button
        onClick={() => setView(isAuthenticated ? 'cloud' : 'auth')}
        className="w-full p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Cloud className="w-5 h-5 text-primary" />
          ) : (
            <CloudOff className="w-5 h-5 text-muted-foreground" />
          )}
          <div className="text-left">
            <p className="font-medium text-foreground">Your Profile</p>
            <p className="text-sm text-muted-foreground">
              {isAuthenticated ? `Synced as ${userEmail}` : 'Save to cloud'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Reset Profile Section */}
      <button
        onClick={() => setView('reset')}
        className="w-full p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-muted-foreground" />
          <div className="text-left">
            <p className="font-medium text-foreground">Reset Profile</p>
            <p className="text-sm text-muted-foreground">Start fresh locally</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Delete Everywhere Section */}
      {isAuthenticated && (
        <button
          onClick={() => setView('delete')}
          className="w-full p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-destructive" />
            <div className="text-left">
              <p className="font-medium text-foreground">Delete Everywhere</p>
              <p className="text-sm text-muted-foreground">Remove all data</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </motion.div>
  );

  const renderAuthView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Cloud className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">
          Save to Cloud
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          You can save your profile securely to the cloud. This helps if you change devices or reinstall the app.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              authMode === 'signin'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
              authMode === 'signup'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground'
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

        {lastError && (
          <p className="text-sm text-destructive">{lastError}</p>
        )}

        <Button
          onClick={handleAuth}
          disabled={isLoading || !email || !password}
          className="w-full"
          variant="gentle"
        >
          {isLoading ? 'Please wait...' : authMode === 'signin' ? 'Sign in' : 'Create account'}
        </Button>

        <button
          onClick={() => setView('main')}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Not now
        </button>
      </div>
    </motion.div>
  );

  const renderCloudView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Check className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">Connected</p>
          <p className="text-sm text-muted-foreground">{userEmail}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-secondary flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground text-sm">Sync habit logs</p>
            <p className="text-xs text-muted-foreground">Save your daily entries to cloud</p>
          </div>
          <Switch
            checked={syncLogsEnabled}
            onCheckedChange={toggleLogSync}
          />
        </div>

        <Button
          onClick={syncToCloud}
          disabled={isSyncing}
          className="w-full"
          variant="outline"
        >
          {isSyncing ? 'Syncing...' : 'Sync now'}
        </Button>

        <button
          onClick={logOut}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      <button
        onClick={() => setView('main')}
        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        ← Back
      </button>
    </motion.div>
  );

  const renderResetView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
          <Leaf className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">
          Reset Profile
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Start fresh. Nothing carries over. This removes your personality profile, habits, and local logs.
        </p>
        {isAuthenticated && (
          <p className="text-xs text-muted-foreground mt-3 px-4 py-2 bg-secondary rounded-lg inline-block">
            Your cloud data remains untouched.
          </p>
        )}
      </div>

      {confirmReset ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-foreground font-medium">
            Are you sure? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setConfirmReset(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSoftReset}
              variant="destructive"
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleSoftReset}
          variant="outline"
          className="w-full"
        >
          Reset profile
        </Button>
      )}

      <button
        onClick={() => { setView('main'); setConfirmReset(false); }}
        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        ← Back
      </button>
    </motion.div>
  );

  const renderDeleteView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-destructive" />
        </div>
        <h3 className="text-lg font-serif font-medium text-foreground">
          Delete Everywhere
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          This removes your profile and data from this device and the cloud. Your account will be signed out.
        </p>
      </div>

      {confirmDelete ? (
        <div className="space-y-3">
          <p className="text-center text-sm text-destructive font-medium">
            This is permanent. All your data will be gone.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setConfirmDelete(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleHardDelete}
              variant="destructive"
              className="flex-1"
            >
              Delete everything
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={handleHardDelete}
          variant="destructive"
          className="w-full"
        >
          Delete everywhere
        </Button>
      )}

      <button
        onClick={() => { setView('main'); setConfirmDelete(false); }}
        className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        ← Back
      </button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-sm bg-card border border-border rounded-3xl shadow-elevated p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-medium text-foreground">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'main' && renderMainView()}
          {view === 'auth' && renderAuthView()}
          {view === 'cloud' && renderCloudView()}
          {view === 'reset' && renderResetView()}
          {view === 'delete' && renderDeleteView()}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
