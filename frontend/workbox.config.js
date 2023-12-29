module.exports = {
  InjectManifest: (options) => {
    // override InjectManifest config here
    options.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024;
    return options;
  },
};
