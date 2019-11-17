const DefinitionManager = require('../src/DefinitionManager');
const IntegerDef = require('../src/defs/IntegerDef');
const Int16Def = require('../src/defs/Int16Def');
const EnumDef = require('../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleInt16 = {format: animalEnum};

describe('Int16Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(Int16Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new Int16Def(manager, {}, null);
            expect(def).toBeInstanceOf(Int16Def);
        });

        it('should extend FormatDef', () => {
            expect(Int16Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new Int16Def(manager, exampleInt16, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new Int16Def(manager, {}, null);
            defWithEnum = new Int16Def(manager, exampleInt16, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([0xFF, 0xFF]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, -15623);
                expect(element._data).toBe(-15623);
            });

            it('should set data to 32767 if a higher value is passed', () => {
                def.setData(element, 0xFFFF);
                expect(element._data).toBe(32767);
            });

            it('should set data to -32768 if a lower value is passed', () => {
                def.setData(element, -452345);
                expect(element._data).toBe(-32768);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            describe('no format', () => {
                it('should convert data to a string', () => {
                    element._data = -3561;
                    expect(def.getValue(element)).toBe('-3561');
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
                    def.setValue(element, '-7345');
                    expect(element._data).toBe(-7345);
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

            it('should return the Int16 read from the stream', () => {
                let data = def.read(stream);
                expect(data).toBe(-1);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(-1);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(2);
                expect(buf[0]).toBe(0xFF);
                expect(buf[1]).toBe(0xFF);
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
            it('should be -32768', () => {
                expect(Int16Def.MIN_VALUE).toBe(-32768);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 32767', () => {
                expect(Int16Def.MAX_VALUE).toBe(32767);
            });
        });
    });
});
