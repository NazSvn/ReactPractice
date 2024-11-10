import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FeatureFlagService from '../flagsData.js';
import { FLAG_CONFIG } from '../flagsData.js';

export const FeatureFlagsContext = createContext(null);

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

  const toggleFlag = (flagName) => {
    setState((prev) => ({
      ...prev,
      flags: {
        ...prev.flags,
        [flagName]: !prev.flags[flagName],
      },
    }));
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const isEnabled = (flagName) => {
    if (!FLAG_CONFIG[flagName]) {
      console.warn(`Feature flag "${flagName}" is not defined in FLAG_CONFIG`);
      return false;
    }
    return state.flags[flagName] ?? FLAG_CONFIG[flagName].defaultValue;
  };

  return (
    <FeatureFlagsContext.Provider
      value={{ ...state, isEnabled, refreshFlags: toggleFlag }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
};

FeatureFlagProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeatureFlagProvider;
