const DefinitionManager = require('../src/DefinitionManager');
const IntegerDef = require('../src/defs/IntegerDef');
const UInt16Def = require('../src/defs/UInt16Def');
const EnumDef = require('../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleUInt16 = {format: animalEnum};

describe('UInt16Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(UInt16Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new UInt16Def(manager, {}, null);
            expect(def).toBeInstanceOf(UInt16Def);
        });

        it('should extend FormatDef', () => {
            expect(UInt16Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new UInt16Def(manager, exampleUInt16, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new UInt16Def(manager, {}, null);
            defWithEnum = new UInt16Def(manager, exampleUInt16, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([0xA3, 0xF1]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, 0x89F1);
                expect(element._data).toBe(0x89F1);
            });

            it('should set data to 0xFFFF if a higher value is passed', () => {
                def.setData(element, 0xFFFFFF);
                expect(element._data).toBe(0xFFFF);
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
                    element._data = 23486;
                    expect(def.getValue(element)).toBe('23486');
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
                    def.setValue(element, '7234');
                    expect(element._data).toBe(7234);
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
                expect(stream.read).toHaveBeenCalledWith(2);
            });

            it('should return the UInt16 read from the stream', () => {
                let data = def.read(stream);
                expect(data).toBe(0xF1A3);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(0x1FA0);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(2);
                expect(buf[0]).toBe(0xA0);
                expect(buf[1]).toBe(0x1F);
            });
        });

        describe('size', () => {
            it('should be 2', () => {
                expect(def.size).toBe(2);
            });
        });
    });

    describe('static properties', () => {
        describe('MIN_VALUE', () => {
            it('should be 0', () => {
                expect(UInt16Def.MIN_VALUE).toBe(0);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 0xFFFF', () => {
                expect(UInt16Def.MAX_VALUE).toBe(0xFFFF);
            });
        });
    });
});
