const path = require("path");

function loadConfig(filepath) {
  try {
    const conf = readConfig(filepath);
    return conf;
  } catch (e) {
    return null;
  }
}

function readConfig(filepath) {
  let options;
  try {
    const configModule = require(filepath);
    options =
      configModule && configModule.__esModule
        ? configModule.default || undefined
        : configModule;
  } catch (err) {
    throw err;
  } finally {
  }
  return {
    filepath,
    dirname: path.dirname(filepath),
    options
  };
}

module.exports = {
  loadConfig,
  readConfig
};
