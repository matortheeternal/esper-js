const PluginFile = require('../../src/elements/PluginFile');
const Container = require('../../src/elements/Container');

let makeDummyFile = filename => ({filename, dummy: true});

let plugin = function(params) {
    return Object.assign(
        Object.create(PluginFile.prototype),
        params
    );
};

let sortedContainer = function(def) {
    let container = Object.create(Container.prototype);
    Object.defineProperty(container, 'sorted', { get: () => true });
    return Object.assign(container, { def, _elements: [] });
};

module.exports = {makeDummyFile, plugin, sortedContainer};
