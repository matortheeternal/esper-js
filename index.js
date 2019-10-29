require('./src/dataTypes');
require('./src/dataFormats');

const PluginFile = require('./src/elements/PluginFile');
const {loadDefinitions} = require('./src/definitionManager');

// EXPORTS
module.exports = {PluginFile, loadDefinitions};
