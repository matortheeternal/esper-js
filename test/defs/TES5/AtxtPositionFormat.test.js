const DefinitionManager = require('../../../src/setup/DefinitionManager');
const AtxtPosititionFormat = require('../../../src/defs/TES5/AtxtPositionFormat');
const FormatDef = require('../../../src/defs/FormatDef');

describe('AtxtPosititionFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(AtxtPosititionFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(AtxtPosititionFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new AtxtPosititionFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(AtxtPosititionFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new AtxtPosititionFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            it('should return "n -> n div 17 -> n mod 17"', () => {
                expect(def.dataToValue(null, 0)).toBe('0 -> 0 -> 0');
                expect(def.dataToValue(null, 1)).toBe('1 -> 0 -> 1');
                expect(def.dataToValue(null, 37)).toBe('37 -> 2 -> 3');
            });
        });

        describe('valueToData', () => {
            it('should parse integer', () => {
                expect(def.valueToData(null, '4 -> 0 -> 4')).toBe(4);
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "AtxtPosititionFormat"', () => {
                expect(AtxtPosititionFormat.name).toBe('AtxtPositionFormat');
            })
        })
    })
});
