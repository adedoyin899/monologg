import { useCreatorStore } from '@/app/stores/creator';
import StepMedia from './onboarding/StepMedia';
import StepNiche from './onboarding/StepNiche';
import StepProcessing from './onboarding/StepProcessing';
import StepRates from './onboarding/StepRates';
import StepTags from './onboarding/StepTags';
import StepWrap from './onboarding/StepWrap';

/** Linear creator onboarding (PWA-02..06 + wrap) driven by the creator store. */
export default function Onboarding() {
  const step = useCreatorStore((state) => state.step);

  switch (step) {
    case 'niche':
      return <StepNiche />;
    case 'media':
      return <StepMedia />;
    case 'processing':
      return <StepProcessing />;
    case 'tags':
      return <StepTags />;
    case 'rates':
      return <StepRates />;
    case 'availability':
      return <StepWrap />;
    default:
      return null;
  }
}
