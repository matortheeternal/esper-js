const DefinitionManager = require('../../../src/setup/DefinitionManager');
const ClmtMoonsPhaseLengthFormat = require(
    '../../../src/defs/TES5/ClmtMoonsPhaseLengthFormat'
);
const FormatDef = require('../../../src/defs/FormatDef');

describe('ClmtMoonsPhaseLengthFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(ClmtMoonsPhaseLengthFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(ClmtMoonsPhaseLengthFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new ClmtMoonsPhaseLengthFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(ClmtMoonsPhaseLengthFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new ClmtMoonsPhaseLengthFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            describe('moon type', () => {
                it('should be no moon by default', () => {
                    let v = def.dataToValue(null, 0);
                    expect(v).toBe('No Moon / 0');
                });

                it('should be masser when seventh bit is set', () => {
                    let v = def.dataToValue(null, 64);
                    expect(v).toBe('Masser / 0');
                });

                it('should be secunda when eighth bit is set', () => {
                    let v = def.dataToValue(null, 128);
                    expect(v).toBe('Secunda / 0');
                });

                it('should be both when both bits are set', () => {
                    let v = def.dataToValue(null, 128 + 64);
                    expect(v).toBe('Masser, Secunda / 0');
                });
            });

            describe('phase length', () => {
                it('should be data % 64', () => {
                    let v = def.dataToValue(null, 128 + 64 + 32);
                    expect(v).toBe('Masser, Secunda / 32');
                });
            });
        });

        describe('valueToData', () => {
            describe('value does not match moon phase expression', () => {
                it('should return 0', () => {
                    expect(def.valueToData(null, '')).toBe(0);
                    expect(def.valueToData(null, 'abcd')).toBe(0);
                    expect(def.valueToData(null, 'masser / 0')).toBe(0);
                });
            });

            describe('value matches moon phase expression', () => {
                it('should handle "No Moon"', () => {
                    let v = 'No Moon / 0';
                    expect(def.valueToData(null, v)).toBe(0);
                });

                it('should set seventh bit if Masser', () => {
                    let v = 'Masser / 0';
                    expect(def.valueToData(null, v)).toBe(64);
                });

                it('should set eighth bit if Secunda', () => {
                    let v = 'Secunda / 0';
                    expect(def.valueToData(null, v)).toBe(128);
                });

                it('should set both bits if both', () => {
                    let v = 'Masser, Secunda / 0';
                    expect(def.valueToData(null, v)).toBe(128 + 64);
                });

                it('should handle phase length', () => {
                    let v = 'Masser, Secunda / 19';
                    expect(def.valueToData(null, v)).toBe(128 + 64 + 19);
                });
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "ClmtMoonsPhaseLengthFormat"', () => {
                expect(ClmtMoonsPhaseLengthFormat.name)
                    .toBe('ClmtMoonsPhaseLengthFormat');
            })
        })
    })
});
