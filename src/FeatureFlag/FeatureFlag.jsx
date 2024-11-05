import { useContext } from 'react';
import { FeatureFlagsContext } from './contextFlag/ContextFlag';

const FeatureFlag = () => {
  const { loading, error, flags } = useContext(FeatureFlagsContext);
  console.log(loading, error, flags);
  return (
    <>
      <div>Hi</div>
    </>
  );
};

export default FeatureFlag;
