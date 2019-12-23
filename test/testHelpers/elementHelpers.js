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

let testElements = function(getRecord, elements) {
    describe('elements', () => {
        elements.forEach(({name, path, value}) => {
            describe(name, () => {
                let element;

                beforeAll(() => {
                    element = getRecord().getElement(path);
                });

                it('should be present', () => {
                    expect(element).toBeDefined();
                });

                it(`should have name "${name}"`, () => {
                    expect(element.name).toBe(name);
                });

                it(`should have value "${value}"`, () => {
                    expect(element.value).toBe(value);
                });
            });
        });
    })
};

module.exports = {makeDummyFile, plugin, sortedContainer, testElements};
