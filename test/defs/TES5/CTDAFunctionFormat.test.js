const DefinitionManager = require('../../../src/setup/DefinitionManager');
const CTDAFunctionFormat = require('../../../src/defs/TES5/CTDAFunctionFormat');
const FormatDef = require('../../../src/defs/FormatDef');
const {UnknownCTDAFunctionError} = require('../../../src/errors');

describe('CTDAFunctionFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(CTDAFunctionFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(CTDAFunctionFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new CTDAFunctionFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(CTDAFunctionFormat);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new CTDAFunctionFormat(manager, {}, null);
        });

        describe('dataToValue', () => {
            describe('known function', () => {
                it('should return option name', () => {
                    expect(def.dataToValue(null, 0)).toBe('GetWantBlocking');
                    expect(def.dataToValue(null, 721)).toBe('IsPoison');
                    expect(def.dataToValue(null, 1024)).toBe('GetSKSEVersion');
                });
            });

            describe('unknown function', () => {
                it('should return <Unknown #>', () => {
                    expect(def.dataToValue(null, 999)).toBe('<Unknown 999>');
                });
            });
        });

        describe('valueToData', () => {
            describe('known function', () => {
                it('should return function index', () => {
                    expect(def.valueToData(null, 'IsUndead')).toBe(715);
                    expect(def.valueToData(null, 'GetSKSERelease')).toBe(1027);
                });
            });

            describe('<Unknown #>', () => {
                it('should return the parsed integer value', () => {
                    expect(def.valueToData(null, '<Unknown 2>')).toBe(2);
                    expect(def.valueToData(null, '<Unknown -99>')).toBe(-99);
                });
            });

            describe('unknown function', () => {
                it('should throw an error', () => {
                    expect(() => {
                        def.valueToData(null, 'DoTheThing');
                    }).toThrow(UnknownCTDAFunctionError);
                });
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "CTDAFunctionFormat"', () => {
                expect(CTDAFunctionFormat.name).toBe('CTDAFunctionFormat');
            })
        })
    })
});
