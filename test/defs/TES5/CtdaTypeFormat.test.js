const DefinitionManager = require('../../../src/setup/DefinitionManager');
const CtdaTypeFormat = require('../../../src/defs/TES5/CtdaTypeFormat');
const FormatDef = require('../../../src/defs/FormatDef');
const {
    InvalidValueError, InvalidEnumValueError, UnknownFlagError
} = require('../../../src/errors');

describe('CtdaTypeFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(CtdaTypeFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(CtdaTypeFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let def = new CtdaTypeFormat(manager, {}, null);
            expect(def).toBeDefined();
            expect(def).toBeInstanceOf(CtdaTypeFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            let uint8 = manager.buildDef({type: 'uint8'}, null);
            def = new CtdaTypeFormat(manager, {}, uint8);
        });

        describe('dataToValue', () => {
            describe('flags present', () => {
                it('should return "op / flags"', () => {
                    expect(def.dataToValue(null, 0x01)).toBe('Equal to / Or');
                    expect(def.dataToValue(null, 0x03)).toBe(
                        'Equal to / Or, Use aliases'
                    );
                });
            });

            describe('no flags present', () => {
                it('should return operator', () => {
                    expect(def.dataToValue(null, 0x00)).toBe('Equal to');
                    expect(def.dataToValue(null, 0x60)).toBe(
                        'Greater than or equal to'
                    );
                    expect(def.dataToValue(null, 0xC0)).toBe(
                        '<Unknown 192>'
                    );
                });
            });
        });

        describe('valueToData', () => {
            describe('invalid value', () => {
                it('should throw an invalid value error', () => {
                    expect(() => {
                        def.valueToData(null, '');
                    }).toThrow(InvalidValueError);
                });
            });

            describe('no flags present', () => {
                describe('invalid enum value', () => {
                    it('should throw an invalid enum value error', () => {
                        expect(() => {
                            def.valueToData(null, 'abcde');
                        }).toThrow(InvalidEnumValueError);
                    });
                });

                describe('valid enum value', () => {
                    it('should parse compare operator', () => {
                        expect(def.valueToData(null, 'Not equal to')).toBe(0x20);
                        expect(def.valueToData(null, 'Less than')).toBe(0x80);
                    });
                });
            });

            describe('flags present', () => {
                describe('known flags', () => {
                    it('should parse flags', () => {
                        let v = 'Greater than / Use global, Use packdata';
                        expect(def.valueToData(null, v)).toBe(0x40 + 0x04 + 0x08);
                    });
                });

                describe('unknown flags', () => {
                    it('should throw an UnknownFlagError', () => {
                        let v = 'Equal to / abcdef, Or';
                        expect(() => {
                            def.valueToData(null, v);
                        }).toThrow(UnknownFlagError);
                    });
                });
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "CtdaTypeFormat"', () => {
                expect(CtdaTypeFormat.name).toBe('CtdaTypeFormat');
            })
        })
    })
});
