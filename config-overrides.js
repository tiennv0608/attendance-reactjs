module.exports = function override(config, env) {
  console.log("React app rewired works!");
  config.resolve.fallback = {
    util: false,
    fs: false,
  };
  return config;
};
