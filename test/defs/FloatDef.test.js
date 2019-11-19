const DefinitionManager = require('../../src/DefinitionManager');
const ValueDef = require('../../src/defs/ValueDef');
const FloatDef = require('../../src/defs/FloatDef');

describe('FloatDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(FloatDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new FloatDef(manager, {}, null);
            expect(def).toBeInstanceOf(FloatDef);
        });

        it('should extend ValueDef', () => {
            expect(FloatDef.prototype).toBeInstanceOf(ValueDef);
        });
    });

    describe('instance methods', () => {
        let def, element, stream;

        beforeAll(() => {
            def = new FloatDef(manager, {}, null);
            element = {_data: 0};
            stream = {
                read: jest.fn(() => new Buffer([0x10, 0x06, 0x9E, 0x3F]))
            };
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, -0.1234);
                expect(element._data).toBe(-0.1234);
            });

            it('should throw an error if passed data is not a number', () => {
                expect(() => {
                    def.setData(element, 'abc');
                }).toThrow('Expected a number, found: string');
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            it('should convert data to a string with 5 decimal places', () => {
                element._data = 3.14159265359;
                expect(def.getValue(element)).toBe('3.14159');
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            it('should parse integer value', () => {
                def.setValue(element, '-2.71828182');
                expect(element._data).toBe(-2.71828182);
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

            it('should return the float read from the stream', () => {
                let data = def.read(stream);
                expect(data).toBeCloseTo(1.23456, 5);
            });
        });

        describe('toBytes', () => {
            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should return the data written into a buffer', () => {
                let buf = def.toBytes(1.23456);
                expect(buf).toBeDefined();
                expect(buf).toBeInstanceOf(Buffer);
                expect(buf.length).toBe(4);
                expect(buf[0]).toBe(0x10);
                expect(buf[1]).toBe(0x06);
                expect(buf[2]).toBe(0x9E);
                expect(buf[3]).toBe(0x3F);
            });
        });

        describe('size', () => {
            it('should be 4', () => {
                expect(def.size).toBe(4);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "float"', () => {
                expect(FloatDef.defType).toBe('float');
            });
        });
    });
});
