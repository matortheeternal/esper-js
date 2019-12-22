const DefinitionManager = require('../../src/setup/DefinitionManager');
const ValueDef = require('../../src/defs/ValueDef');
const EmptyDef = require('../../src/defs/EmptyDef');

describe('EmptyDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(EmptyDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new EmptyDef(manager, {}, null);
            expect(def).toBeInstanceOf(EmptyDef);
        });

        it('should extend ValueDef', () => {
            expect(EmptyDef.prototype).toBeInstanceOf(ValueDef);
        });
    });

    describe('instance methods', () => {
        let def, element, stream;

        beforeAll(() => {
            def = new EmptyDef(manager, {}, null);
            element = {};
            stream = {read: jest.fn()};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should do nothing', () => {
                def.setData(element, 1);
                expect(element._data).toBeUndefined();
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            it('should return an empty string', () => {
                expect(def.getValue(element)).toBe('');
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            it('should do nothing', () => {
                def.setValue(element, '1');
                expect(element._data).toBeUndefined();
            });
        });

        describe('readData', () => {
            it('should be defined', () => {
                expect(def.readData).toBeDefined();
            });

            it('should return undefined', () => {
                let data = def.readData(stream);
                expect(data).toBeUndefined();
                expect(stream.read).toHaveBeenCalledTimes(0);
            });
        });

        describe('size', () => {
            it('should be 0', () => {
                expect(def.size).toBe(0);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "empty"', () => {
                expect(EmptyDef.defType).toBe('empty');
            });
        });
    });
});
