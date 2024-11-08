import { useContext, useEffect } from 'react';
import { FeatureFlagsContext, useFeatureFlag } from './contextFlag/ContextFlag';
import useThemeToggle from '../LightDarkTheme/useThemeToggle';
import { FLAGS } from './flagsData';

const NewHeader = () => {
  return (
    <>
      <div>New Header</div>
    </>
  );
};

const FeatureFlag = () => {
  const { loading, error } = useContext(FeatureFlagsContext);
  const [theme, setTheme] = useThemeToggle('light');

  const isNewHeader = useFeatureFlag(FLAGS.NEW_HEADER);
  const isDarkMode = useFeatureFlag(FLAGS.DARK_MODE);
  const isBetaFeatures = useFeatureFlag(FLAGS.BETA_FEATURES);
  const isNewPricing = useFeatureFlag(FLAGS.NEW_PRICING);

  useEffect(() => {
    if (isDarkMode) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [isDarkMode, setTheme]);

  if (loading)
    return (
      <div className='wrapper'>
        <div>Loading</div>
      </div>
    );
  if (error)
    return (
      <div className='wrapper'>
        <div>{error}</div>
      </div>
    );

  return (
    <div
      className='flags-wrapper'
      data-theme={theme}
    >
      <button>toggle</button>

      {isNewHeader ? <NewHeader /> : <header>Old header</header>}

      <main>
        {isBetaFeatures ? <div>beta features</div> : <div>old content</div>}

        {(isNewPricing && <div>New price list</div>) || (
          <div>old price list</div>
        )}
      </main>

      <div>{isDarkMode ? 'dark mode on' : 'light mode on'}</div>
      <div>some random content here</div>
    </div>
  );
};

export default FeatureFlag;
