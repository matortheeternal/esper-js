const path = require('path');
const MemoryMap = require('memory-map');
const DefinitionManager = require('../../src/DefinitionManager');
const ValueDef = require('../../src/defs/ValueDef');
const StringDef = require('../../src/defs/StringDef');

describe('StringDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(StringDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new StringDef(manager, {}, null);
            expect(def).toBeInstanceOf(StringDef);
        });

        it('should extend ValueDef', () => {
            expect(StringDef.prototype).toBeInstanceOf(ValueDef);
        });
    });

    describe('instance methods', () => {
        let def, element, stream;

        beforeAll(() => {
            def = new StringDef(manager, {}, null);
            element = {};
            let filePath = path.resolve('./test/resources/string');
            stream = new MemoryMap(filePath);
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set data', () => {
                def.setData(element, 'abc123');
                expect(element._data).toBe('abc123');
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            it('should return string data', () => {
                element._data = 'text';
                expect(def.getValue(element)).toBe('text');
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            it('should set string data', () => {
                def.setValue(element, 'Iron Sword');
                expect(element._data).toBe('Iron Sword');
            });
        });

        describe('readData', () => {
            it('should be defined', () => {
                expect(def.readData).toBeDefined();
            });

            describe('variable size', () => {
                it('should return the string', () => {
                    stream.setPos(0x00);
                    expect(def.readData(stream)).toBe('abcdefghijkl');
                });

                it('should work with empty strings', () => {
                    stream.setPos(0x0D);
                    expect(def.readData(stream)).toBe('');
                });
            });

            describe('fixed size', () => {
                beforeAll(() => def.src.size = 3);
                afterAll(() => delete def.src.size);

                it('should read size bytes', () => {
                    stream.setPos(0x00);
                    expect(def.readData(stream)).toBe('abc');
                    expect(def.readData(stream)).toBe('def');
                    expect(def.readData(stream)).toBe('ghi');
                });
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "string"', () => {
                expect(StringDef.defType).toBe('string');
            });
        });
    });
});
