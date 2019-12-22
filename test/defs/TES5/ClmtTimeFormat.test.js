const DefinitionManager = require('../../../src/setup/DefinitionManager');
const ClmtTimeFormat = require('../../../src/defs/TES5/ClmtTimeFormat');
const FormatDef = require('../../../src/defs/FormatDef');

describe('ClmtTimeFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(ClmtTimeFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(ClmtTimeFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new ClmtTimeFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(ClmtTimeFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new ClmtTimeFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            it('should convert to HH:MM', () => {
                expect(def.dataToValue(null, 10)).toBe('01:40');
                expect(def.dataToValue(null, 73)).toBe('12:10');
                expect(def.dataToValue(null, 99)).toBe('16:30');
            })
        });

        describe('valueToData', () => {
            it('should convert HH:MM', () => {
                expect(def.valueToData(null, '03:50')).toBe(23);
                expect(def.valueToData(null, '13:20')).toBe(80);
            });

            it('should parse integer values', () => {
                expect(def.valueToData(null, '48')).toBe(48);
                expect(def.valueToData(null, '0')).toBe(0);
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "ClmtTimeFormat"', () => {
                expect(ClmtTimeFormat.name).toBe('ClmtTimeFormat');
            })
        })
    })
});
