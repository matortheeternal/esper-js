const PluginFile = require('../../src/elements/PluginFile');

const makeDummyFile = filename => ({filename, dummy: true});

const basicFile = Object.create(PluginFile.prototype);
basicFile.filename = 'Basic.esp';
basicFile._masters = ['Skyrim.esm'].map(makeDummyFile);

module.exports = basicFile;
