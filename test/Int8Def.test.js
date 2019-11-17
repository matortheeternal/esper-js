const DefinitionManager = require('../src/DefinitionManager');
const IntegerDef = require('../src/defs/IntegerDef');
const Int8Def = require('../src/defs/Int8Def');
const EnumDef = require('../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleInt8 = {format: animalEnum};

describe('Int8Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(Int8Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new Int8Def(manager, {}, null);
            expect(def).toBeInstanceOf(Int8Def);
        });

        it('should extend IntegerDef', () => {
            expect(Int8Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new Int8Def(manager, exampleInt8, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new Int8Def(manager, {}, null);
            defWithEnum = new Int8Def(manager, exampleInt8, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([0xFF]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, -64);
                expect(element._data).toBe(-64);
            });

            it('should set data to 127 if a higher value is passed', () => {
                def.setData(element, 255);
                expect(element._data).toBe(127);
            });

            it('should set data to -128 if a lower value is passed', () => {
                def.setData(element, -255);
                expect(element._data).toBe(-128);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            describe('no format', () => {
                it('should convert data to a string', () => {
                    element._data = -61;
                    expect(def.getValue(element)).toBe('-61');
                });
            });

            describe('with format', () => {
                it(`should call the formatDef's dataToValue function`, () => {
                    element._data = 1;
                    expect(defWithEnum.getValue(element)).toBe('Hippo');
                });
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            describe('no format', () => {
                it('should parse integer value', () => {
                    def.setValue(element, '-42');
                    expect(element._data).toBe(-42);
                });
            });

            describe('with format', () => {
                it(`should call the formatDef's valueToData function`, () => {
                    defWithEnum.setValue(element, 'Lion');
                    expect(element._data).toBe(2);
                });
            });
        });

        describe('read', () => {
            it('should be defined', () => {
                expect(def.read).toBeDefined();
            });

            it('should call stream.read', () => {
                def.read(stream);
                expect(stream.read).toHaveBeenCalledWith(1);
            });

            it('should return the Int8 read from the stream', () => {
                let data = def.read(stream);
                expect(data).toBe(-1);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(-127);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(1);
                expect(buf[0]).toBe(129);
            });
        });

        describe('size', () => {
            it('should be 1', () => {
                expect(def.size).toBe(1);
            });
        });
    });

    describe('static properties', () => {
        describe('MIN_VALUE', () => {
            it('should be -128', () => {
                expect(Int8Def.MIN_VALUE).toBe(-128);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 127', () => {
                expect(Int8Def.MAX_VALUE).toBe(127);
            });
        });
    });
});
