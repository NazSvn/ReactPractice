const FLAGS = {
  NEW_HEADER: 'NEW_HEADER',
  DARK_MODE: 'DARK_MODE',
  BETA_FEATURES: 'BETA_FEATURES',
  NEW_PRICING: 'NEW_PRICING',
};

const FeatureFlagService = () => {
  return new Promise((resolve, reject) => {
    if (FLAGS) {
      setTimeout(() => {
        resolve(FLAGS);
      }, 500);
    } else {
      reject('No flags found');
    }
  });
};

export default FeatureFlagService;
