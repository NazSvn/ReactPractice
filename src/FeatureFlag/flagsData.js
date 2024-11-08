export const FLAGS = {
  NEW_HEADER: 'NEW_HEADER',
  DARK_MODE: 'DARK_MODE',
  BETA_FEATURES: 'BETA_FEATURES',
  NEW_PRICING: 'NEW_PRICING',
};

export const FLAG_CONFIG = {
  [FLAGS.NEW_HEADER]: {
    name: FLAGS.NEW_HEADER,
    defaultValue: false,
    description: 'Enables the new header design',
  },
  [FLAGS.DARK_MODE]: {
    name: FLAGS.DARK_MODE,
    defaultValue: false,
    description: 'Enables dark mode theme',
  },
  [FLAGS.BETA_FEATURES]: {
    name: FLAGS.BETA_FEATURES,
    defaultValue: false,
    description: 'Enables beta features',
  },
  [FLAGS.NEW_PRICING]: {
    name: FLAGS.NEW_PRICING,
    defaultValue: false,
    description: 'Enables new pricing display',
  },
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
