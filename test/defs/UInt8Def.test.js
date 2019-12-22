const DefinitionManager = require('../../src/setup/DefinitionManager');
const IntegerDef = require('../../src/defs/IntegerDef');
const UInt8Def = require('../../src/defs/UInt8Def');
const EnumDef = require('../../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleUInt8 = {format: animalEnum};

describe('UInt8Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(UInt8Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new UInt8Def(manager, {}, null);
            expect(def).toBeInstanceOf(UInt8Def);
        });

        it('should extend IntegerDef', () => {
            expect(UInt8Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new UInt8Def(manager, exampleUInt8, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new UInt8Def(manager, {}, null);
            defWithEnum = new UInt8Def(manager, exampleUInt8, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([170]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, 128);
                expect(element._data).toBe(128);
            });

            it('should set data to 255 if a higher value is passed', () => {
                def.setData(element, 1024);
                expect(element._data).toBe(255);
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
                    element._data = 129;
                    expect(def.getValue(element)).toBe('129');
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
                    def.setValue(element, '63');
                    expect(element._data).toBe(63);
                });
            });

            describe('with format', () => {
                it(`should call the formatDef's valueToData function`, () => {
                    defWithEnum.setValue(element, 'Lion');
                    expect(element._data).toBe(2);
                });
            });
        });

        describe('readData', () => {
            it('should be defined', () => {
                expect(def.readData).toBeDefined();
            });

            it('should call stream.read', () => {
                def.readData(stream);
                expect(stream.read).toHaveBeenCalledWith(1);
            });

            it('should return the UInt8 read from the stream', () => {
                let data = def.readData(stream);
                expect(data).toBe(170);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(0xFF);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(1);
                expect(buf[0]).toBe(0xFF);
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
            it('should be 0', () => {
                expect(UInt8Def.MIN_VALUE).toBe(0);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 255', () => {
                expect(UInt8Def.MAX_VALUE).toBe(255);
            });
        });
    });
});
