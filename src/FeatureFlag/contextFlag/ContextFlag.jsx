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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flags, setFlags] = useState({});

  const fetchFlags = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await FeatureFlagService();

      setFlags(response);
    } catch (error) {
      setError(error.message);
      setFlags({});
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{ loading, error, flags }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

FeatureFlagProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeatureFlagProvider;
