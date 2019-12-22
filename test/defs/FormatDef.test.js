const DefinitionManager = require('../../src/setup/DefinitionManager');
const FormatDef = require('../../src/defs/FormatDef');
const Def = require('../../src/defs/Def');

describe('FormatDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(FormatDef).toBeDefined();
        });

        it('should create a new instance', () => {
            def = new FormatDef(manager, {}, null);
            expect(def).toBeInstanceOf(FormatDef);
        });

        it('should extend def', () => {
            expect(FormatDef.prototype).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new FormatDef(manager, {}, null);
        });

        describe('dataToValue', () => {
            it('should be defined', () => {
                expect(def.dataToValue).toBeDefined();
            });

            it('should return the data converted to a string', () => {
                expect(def.dataToValue(null, 40)).toBe('40');
            });
        });

        describe('valueToData', () => {
            it('should be defined', () => {
                expect(def.valueToData).toBeDefined();
            });

            it('should return the value converted to an integer', () => {
                expect(def.valueToData(null, '40')).toBe(40);
            });
        });
    });
});
