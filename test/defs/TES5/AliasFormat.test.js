const DefinitionManager = require('../../../src/DefinitionManager');
const AliasFormat = require('../../../src/defs/TES5/AliasFormat');
const FormatDef = require('../../../src/defs/FormatDef');

describe('AliasFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(AliasFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(AliasFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new AliasFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(AliasFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new AliasFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            describe('data === -1', () => {
                it('should return "None"', () => {
                    expect(def.dataToValue(null, -1)).toBe('None');
                });
            });

            describe('data !== -1', () => {
                it('should return number as string', () => {
                    expect(def.dataToValue(null, 0)).toBe('0');
                    expect(def.dataToValue(null, 1)).toBe('1');
                    expect(def.dataToValue(null, 30)).toBe('30');
                });
            });
        });

        describe('valueToData', () => {
            describe('value === "None"', () => {
                it('should return -1', () => {
                    expect(def.valueToData(null, 'None')).toBe(-1);
                });
            });

            describe('value !== "None"', () => {
                it('should parse integer and return it', () => {
                    expect(def.valueToData(null, '0')).toBe(0);
                    expect(def.valueToData(null, '1')).toBe(1);
                    expect(def.valueToData(null, '30')).toBe(30);
                });
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "AliasFormat"', () => {
                expect(AliasFormat.name).toBe('AliasFormat');
            })
        })
    })
});
