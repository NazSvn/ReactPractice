import { useContext } from 'react';
import { FeatureFlagsContext } from './contextFlag/ContextFlag';

const useFeatureFlag = (flagName) => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlag must be used within a FeatureFlagProvider');
  }
  return context.isEnabled(flagName);
};

export default useFeatureFlag;
