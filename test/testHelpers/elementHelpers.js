const PluginFile = require('../../src/elements/PluginFile');
const Container = require('../../src/elements/Container');

let makeDummyFile = filename => ({filename, dummy: true});

let plugin = function(params) {
    let p = Object.assign(
        Object.create(PluginFile.prototype),
        params
    );
    p.initMastersByFilename();
    return p;
};

let sortedContainer = function(def) {
    let container = Object.create(Container.prototype),
        mmap = { getPos: () => 0 };
    Object.defineProperty(container, 'sorted', { get: () => true });
    Object.defineProperty(container, 'memoryMap', { get: () => mmap });
    return Object.assign(container, { def, _elements: [] });
};

module.exports = {makeDummyFile, plugin, sortedContainer};
