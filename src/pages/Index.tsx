import { useFlowNautStore } from '@/store/flownaut-store';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { useHabitNotifications } from '@/hooks/use-habit-notifications';

const Index = () => {
  const hasCompletedOnboarding = useFlowNautStore((s) => s.hasCompletedOnboarding);
  useHabitNotifications();

  return (
    <div className="min-h-screen bg-background">
      {hasCompletedOnboarding ? <Dashboard /> : <OnboardingFlow />}
    </div>
  );
};

export default Index;
