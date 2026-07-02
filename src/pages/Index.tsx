import { useFlowNautStore } from '@/store/flownaut-store';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  const hasCompletedOnboarding = useFlowNautStore((s) => s.hasCompletedOnboarding);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl min-h-screen bg-background sm:shadow-card sm:border-x sm:border-border/40">
        {hasCompletedOnboarding ? <Dashboard /> : <OnboardingFlow />}
      </div>
    </div>
  );
};

export default Index;
