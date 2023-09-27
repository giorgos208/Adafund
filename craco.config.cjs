module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.experiments = {
        topLevelAwait: true,
      };
      return webpackConfig;
    },
  },
};
