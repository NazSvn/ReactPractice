import { useContext, useEffect, useState } from 'react';
import { FeatureFlagsContext } from './contextFlag/ContextFlag';
import useThemeToggle from '../LightDarkTheme/useThemeToggle';
import { FLAGS } from './flagsData';
import useFeatureFlag from './useFeatureFlag';
import './featureFlag.css';
import NewHeader from './features/NewHeader';
import { FiMoon, FiSettings, FiSun } from 'react-icons/fi';
import NewBetaFeatures from './features/NewBetaFeatures';
import NewPricing from './features/NewPricing';

const FeatureFlag = () => {
  const { loading, error, refreshFlags } = useContext(FeatureFlagsContext);
  const [theme, setTheme] = useThemeToggle('light');
  const [buttonModal, setButtonModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleThemeToggle = () => {
    refreshFlags(FLAGS.DARK_MODE);
  };

  const handleButtonModal = () => {
    if (buttonModal) {
      setIsClosing(true);
      setTimeout(() => {
        setButtonModal(false);
        setIsClosing(false);
      }, 300);
    } else {
      setButtonModal(true);
    }
  };

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
    <div className=''>
      <div className='flag-wrapper'>
        <div
          className='container'
          data-theme={theme}
        >
          <button
            className='toggleButton'
            onClick={handleButtonModal}
          >
            <FiSettings size={16} />
            Toggle Features
          </button>
          {buttonModal && (
            <div
              className={`controllers-container ${isClosing ? 'slideUp' : ''}`}
            >
              <button onClick={() => refreshFlags(FLAGS.NEW_HEADER)}>
                {isNewHeader ? 'Old Header' : 'New Header'}
              </button>
              <button onClick={() => refreshFlags(FLAGS.BETA_FEATURES)}>
                {isBetaFeatures ? 'Old features' : 'Beta Features'}
              </button>
              <button onClick={() => refreshFlags(FLAGS.NEW_PRICING)}>
                {isNewPricing ? 'Old pricing' : 'New Pricing'}
              </button>
            </div>
          )}

          {isNewHeader ? (
            <NewHeader />
          ) : (
            <header className='oldHeader'>
              <div className='headerContent'>
                <h1 className='headerTitle'>SuperStore</h1>
                <nav className='nav'>
                  <a
                    href='#'
                    className='navLink'
                  >
                    Shop
                  </a>
                  <a
                    href='#'
                    className='navLink'
                  >
                    Cart
                  </a>
                </nav>
              </div>
            </header>
          )}

          <main className='main'>
            {isBetaFeatures ? (
              <NewBetaFeatures />
            ) : (
              <div className='oldProductGrid'>
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className='oldProductCard'
                  >
                    <div className='productImage'></div>
                    <h3>Classic Product {item}</h3>
                    <p>Basic product description</p>
                  </div>
                ))}
              </div>
            )}

            {isNewPricing ? (
              <NewPricing />
            ) : (
              <div className='oldPricing'>
                <h2 className='pricingTitle'>Standard Pricing</h2>
                <div>
                  <div className='pricingRow'>
                    <span>Basic Plan</span>
                    <span>$14.99/month</span>
                  </div>
                  <div className='pricingRow'>
                    <span>Pro Plan</span>
                    <span>$24.99/month</span>
                  </div>
                </div>
              </div>
            )}
          </main>

          <button
            className='themeToggle'
            onClick={handleThemeToggle}
          >
            {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
          </button>

          <div className='footer'>© 2024 SuperStore. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFlag;
