const PluginFile = require('../../src/elements/PluginFile');

let makeDummyFile = filename => ({filename, dummy: true});

let plugin = function(params) {
    return Object.assign(
        Object.create(PluginFile.prototype),
        params
    );
};

module.exports = {makeDummyFile, plugin};
