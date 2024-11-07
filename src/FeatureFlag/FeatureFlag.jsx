import { useContext } from 'react';
import { FeatureFlagsContext } from './contextFlag/ContextFlag';

const FeatureFlag = () => {
  const { loading, error, flags } = useContext(FeatureFlagsContext);
  console.log(loading, error, flags);
  return (
    <>
      <div>
        <div>
          <button>
            <header></header>
            <main></main>
            {/* theme */}
            {/* content */}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeatureFlag;
