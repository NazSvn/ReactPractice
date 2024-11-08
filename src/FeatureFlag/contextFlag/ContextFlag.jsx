import { createContext, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FeatureFlagService from '../flagsData.js';

export const FeatureFlagsContext = createContext(null);

export const useFeatureFlag = (flagName) => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlag must be used within a FeatureFlagProvider');
  }
  return context.isEnabled(flagName);
};

const FeatureFlagProvider = ({ children }) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    flags: {},
  });

  const fetchFlags = async () => {
    try {
      const response = await FeatureFlagService();

      setState((prev) => ({
        ...prev,
        loading: false,
        flags: response,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
        flags: {},
      }));
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <FeatureFlagsContext.Provider
      value={{ ...state, isEnabled, refreshFlags: fetchFlags }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};

FeatureFlagProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeatureFlagProvider;
