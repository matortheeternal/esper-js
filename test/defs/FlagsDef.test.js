const DefinitionManager = require('../../src/setup/DefinitionManager');
const FlagsDef = require('../../src/defs/FlagsDef');
const FormatDef = require('../../src/defs/FormatDef');
const UInt32Def = require('../../src/defs/UInt32Def');
const {UnknownFlagError} = require('../../src/errors');

const exampleFlags = {
    flags: {
        0: 'Initially Disabled',
        1: 'No Havok'
    }
};

describe('FlagsDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(FlagsDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new FlagsDef(manager, {}, null);
            expect(def).toBeInstanceOf(FlagsDef);
        });

        it('should extend FormatDef', () => {
            expect(FlagsDef.prototype).toBeInstanceOf(FormatDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            let uint32Def = new UInt32Def(manager, {}, null);
            def = new FlagsDef(manager, exampleFlags, uint32Def);
        });

        describe('getFlagValue', () => {
            it('should be defined', () => {
                expect(def.getFlagValue).toBeDefined();
            });

            it(`should return the flag value`, () => {
                expect(def.getFlagValue(0)).toBe('Initially Disabled');
                expect(def.getFlagValue(1)).toBe('No Havok');
            });

            it('should return unknown flag values', () => {
                expect(def.getFlagValue(3)).toBe('Unknown 3');
            });
        });

        describe('getFlagIndex', () => {
            it('should be defined', () => {
                expect(def.getFlagIndex).toBeDefined();
            });

            it(`should return the flag index for known flags`, () => {
                expect(def.getFlagIndex('Initially Disabled')).toBe(0);
                expect(def.getFlagIndex('No Havok')).toBe(1);
            });

            it('should return the index for "Unknown #" flags', () => {
                expect(def.getFlagIndex('Unknown 3')).toBe(3);
            });

            it('should throw an error if flag is not known', () => {
                expect(() => {
                    def.getFlagIndex('sdfk')
                }).toThrow(UnknownFlagError);
            });
        });

        describe('dataToValue', () => {
            it('should be defined', () => {
                expect(def.dataToValue).toBeDefined();
            });

            it('should return single flag values', () => {
                expect(def.dataToValue(null, 0x1)).toBe('Initially Disabled');
                expect(def.dataToValue(null, 0x2)).toBe('No Havok');
            });

            it('should return multiple flag values separated by commas', () => {
                expect(def.dataToValue(null, 0x3)).toBe(
                    'Initially Disabled, No Havok'
                );
            });

            it('should return the unknown flag values', () => {
                expect(def.dataToValue(null, 12)).toBe('Unknown 2, Unknown 3');
            });
        });

        describe('valueToData', () => {
            it('should be defined', () => {
                expect(def.valueToData).toBeDefined();
            });

            describe('empty string passed', () => {
                it('should return 0', () => {
                    expect(def.valueToData(null, '')).toBe(0);
                });
            });

            describe('valid flags', () => {
                it('should convert single flags', () => {
                    expect(def.valueToData(null, 'Initially Disabled')).toBe(1);
                    expect(def.valueToData(null, 'No Havok')).toBe(2);
                });

                it('should convert multiple flags', () => {
                    expect(def.valueToData(null,
                        'Initially Disabled, No Havok'
                    )).toBe(3);
                    expect(def.valueToData(null, 'Unknown 2, Unknown 3')).toBe(12);
                });
            });

            describe('invalid flags', () => {
                it('should throw an error', () => {
                    expect(() => {
                        def.valueToData(null, 'abcdefsgzxcsdfrg')
                    }).toThrow(UnknownFlagError);
                });
            });
        });
    });
});
