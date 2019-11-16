const DefinitionManager = require('../src/DefinitionManager');
const BytesDef = require('../src/defs/BytesDef');
const ValueDef = require('../src/defs/ValueDef');
const InvalidDefSizeError = require('../src/errors/InvalidDefSizeError');
const InvalidValueError = require('../src/errors/InvalidValueError');

const bytesDef = {size: 4};

describe('BytesDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(BytesDef).toBeDefined();
        });

        it('should throw an error if the def size is invalid', () => {
            expect(() => {
                new BytesDef(manager, {size: 'a'}, null);
            }).toThrow(InvalidDefSizeError);
        });

        it('should create a new instance', () => {
            let def = new BytesDef(manager, bytesDef, null);
            expect(def).toBeInstanceOf(BytesDef);
        });

        it('should extend ValueDef', () => {
            expect(BytesDef.prototype).toBeInstanceOf(ValueDef);
        });
    });

    describe('instance methods', () => {
        let def, stream, element;

        beforeAll(() => {
            def = new BytesDef(manager, bytesDef, null);
            stream = {read: jest.fn()};
            element = {_data: null};
        });

        describe('read', () => {
            it('should be defined', () => {
                expect(def.read).toBeDefined();
            });

            it('should call stream.read passing the bytesDef size', () => {
                def.read(stream);
                expect(stream.read).toHaveBeenCalledWith(4);
            });
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should throw an error if data is undefined', () => {
                expect(() => {
                    def.setData(element, undefined);
                }).toThrow(/Expected a Buffer, found undefined/);
            });

            it('should throw an error if data is not a buffer', () => {
                expect(() => {
                    def.setData(element, '0123');
                }).toThrow(/Expected a Buffer, found 0123/);
            });

            it('should throw an error if buffer length != def size', () => {
                expect(() => {
                    def.setData(element, new Buffer(2));
                }).toThrow(/Expected buffer length 4, found buffer length 2./);
            });

            it(`should set the element's _data property`, () => {
                let buf = new Buffer(4);
                def.setData(element, buf);
                expect(element._data).toBe(buf);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            it('should convert the bytes into hexadecimal numbers', () => {
                element._data = new Buffer([0xFF, 0x80, 0x1E, 0xA4]);
                expect(def.getValue(element)).toBe('FF 80 1E A4');
            });

            it('should return an empty string if data is an empty buffer', () => {
                element._data = new Buffer(0);
                expect(def.getValue(element)).toBe('');
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            it('should throw an error if the value is formatted incorrectly', () => {
                expect(() => {
                    def.setValue(element, 'dsf');
                }).toThrow(InvalidValueError);
            });

            it('should parse the string and set element data', () => {
                def.setValue(element, 'FF 2E 00 A1');
                expect(element._data[0]).toBe(0xFF);
                expect(element._data[1]).toBe(0x2E);
                expect(element._data[2]).toBe(0x00);
                expect(element._data[3]).toBe(0xA1);
            });
        });
    });
});
