const DefinitionManager = require('../src/DefinitionManager');
const IntegerDef = require('../src/defs/IntegerDef');
const UInt32Def = require('../src/defs/UInt32Def');
const EnumDef = require('../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleUInt32 = {format: animalEnum};

describe('UInt32Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(UInt32Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new UInt32Def(manager, {}, null);
            expect(def).toBeInstanceOf(UInt32Def);
        });

        it('should extend FormatDef', () => {
            expect(UInt32Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new UInt32Def(manager, exampleUInt32, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new UInt32Def(manager, {}, null);
            defWithEnum = new UInt32Def(manager, exampleUInt32, null);
            element = {_data: 0};
            let b = new Buffer([0x3E, 0x01, 0xA0, 0xFF]);
            stream = {read: jest.fn(() => b)};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, 0x80000000);
                expect(element._data).toBe(0x80000000);
            });

            it('should set data to 0xFFFFFFFF if a higher value is passed', () => {
                def.setData(element, Math.pow(2, 40));
                expect(element._data).toBe(0xFFFFFFFF);
            });

            it('should set data to 0 if a lower value is passed', () => {
                def.setData(element, -1);
                expect(element._data).toBe(0);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            describe('no format', () => {
                it('should convert data to a string', () => {
                    element._data = 123456789;
                    expect(def.getValue(element)).toBe('123456789');
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
                    def.setValue(element, '432012345');
                    expect(element._data).toBe(432012345);
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
                expect(stream.read).toHaveBeenCalledWith(4);
            });

            it('should return the UInt32 read from the stream', () => {
                let data = def.read(stream);
                expect(data).toBe(0xFFA0013E);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(0xFFA0013E);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(4);
                expect(buf[0]).toBe(0x3E);
                expect(buf[1]).toBe(0x01);
                expect(buf[2]).toBe(0xA0);
                expect(buf[3]).toBe(0xFF);
            });
        });

        describe('size', () => {
            it('should be 4', () => {
                expect(def.size).toBe(4);
            });
        });
    });

    describe('static properties', () => {
        describe('MIN_VALUE', () => {
            it('should be 0', () => {
                expect(UInt32Def.MIN_VALUE).toBe(0);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 0xFFFFFFFF', () => {
                expect(UInt32Def.MAX_VALUE).toBe(0xFFFFFFFF);
            });
        });
    });
});
