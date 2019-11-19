const DefinitionManager = require('../../../src/DefinitionManager');
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
                expect(def.dataToValue(null, 1270 + 127)).toBe('1.0000');
                expect(def.dataToValue(null, 1270/2 + 127)).toBe('0.5000');
            });
        });

        describe('valueToData', () => {
            it('should parse float string', () => {
                expect(def.valueToData(null, '0.0181')).toBe(150);
            });

            it('should have maximum value of 254', () => {
                expect(def.valueToData(null, '1.0')).toBe(254);
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
