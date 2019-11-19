const DefinitionManager = require('../../src/DefinitionManager');
const IntegerDef = require('../../src/defs/IntegerDef');
const Int32Def = require('../../src/defs/Int32Def');
const EnumDef = require('../../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleInt32 = {format: animalEnum};

describe('Int32Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(Int32Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new Int32Def(manager, {}, null);
            expect(def).toBeInstanceOf(Int32Def);
        });

        it('should extend IntegerDef', () => {
            expect(Int32Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new Int32Def(manager, exampleInt32, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new Int32Def(manager, {}, null);
            defWithEnum = new Int32Def(manager, exampleInt32, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([0xFF, 0xFF, 0xFF, 0xFF]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, -35735723);
                expect(element._data).toBe(-35735723);
            });

            it('should set data to 2147483647 if a higher value is passed', () => {
                def.setData(element, 2147483648);
                expect(element._data).toBe(2147483647);
            });

            it('should set data to -2147483648 if a lower value is passed', () => {
                def.setData(element, -2147483649);
                expect(element._data).toBe(-2147483648);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            describe('no format', () => {
                it('should convert data to a string', () => {
                    element._data = -3456378;
                    expect(def.getValue(element)).toBe('-3456378');
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
                    def.setValue(element, '-12345678');
                    expect(element._data).toBe(-12345678);
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

            it('should return the Int32 read from the stream', () => {
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
                expect(buf.length).toBe(4);
                expect(buf[0]).toBe(0xFF);
                expect(buf[1]).toBe(0xFF);
                expect(buf[2]).toBe(0xFF);
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
            it('should be -2147483648', () => {
                expect(Int32Def.MIN_VALUE).toBe(-2147483648);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 2147483647', () => {
                expect(Int32Def.MAX_VALUE).toBe(2147483647);
            });
        });
    });
});
