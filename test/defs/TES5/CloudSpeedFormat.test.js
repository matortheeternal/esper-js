const DefinitionManager = require('../../../src/setup/DefinitionManager');
const CloudSpeedFormat = require('../../../src/defs/TES5/CloudSpeedFormat');
const FormatDef = require('../../../src/defs/FormatDef');

describe('CloudSpeedFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(CloudSpeedFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(CloudSpeedFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new CloudSpeedFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(CloudSpeedFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new CloudSpeedFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            it('should return float string', () => {
                expect(def.dataToValue(null, 0x00)).toBe('-0.1000');
                expect(def.dataToValue(null, 0x7F)).toBe('0.0000');
                expect(def.dataToValue(null, 0xFE)).toBe('0.1000');
            });
        });

        describe('valueToData', () => {
            it('should parse float string', () => {
                expect(def.valueToData(null, '-0.1000')).toBe(0);
                expect(def.valueToData(null, '0.0000')).toBe(0x7F);
                expect(def.valueToData(null, '0.1000')).toBe(0xFE);
            });

            it('should have maximum value of 254', () => {
                expect(def.valueToData(null, '1.0')).toBe(0xFE);
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "CloudSpeedFormat"', () => {
                expect(CloudSpeedFormat.name).toBe('CloudSpeedFormat');
            })
        })
    })
});
