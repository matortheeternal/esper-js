const DefinitionManager = require('../../src/DefinitionManager');
const EnumDef = require('../../src/defs/EnumDef');
const FormatDef = require('../../src/defs/FormatDef');
const {InvalidEnumValueError} = require('../../src/errors');

const animalEnum = {
    options: {
        1: 'Giraffe',
        2: 'Hippo'
    },
    unknownOption: '<Unknown Animal>'
};

describe('EnumDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(EnumDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new EnumDef(manager, {}, null);
            expect(def).toBeInstanceOf(EnumDef);
        });

        it('should extend FormatDef', () => {
            expect(EnumDef.prototype).toBeInstanceOf(FormatDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new EnumDef(manager, animalEnum, null);
        });

        describe('dataToValue', () => {
            it('should be defined', () => {
                expect(def.dataToValue).toBeDefined();
            });

            describe('known option', () => {
                it('should return the enumeration option value', () => {
                    expect(def.dataToValue(null, 1)).toBe('Giraffe');
                    expect(def.dataToValue(null, 2)).toBe('Hippo');
                });
            });

            describe('unknown option', () => {
                it('should return unknown format', () => {
                    delete def.unknownOption;
                    expect(def.dataToValue(null, 3)).toBe('<Unknown 3>');
                });
            });
        });

        describe('valueToData', () => {
            describe('known option', () => {
                it('should return the option id', () => {
                    expect(def.valueToData(null, 'Giraffe')).toBe(1);
                    expect(def.valueToData(null, 'Hippo')).toBe(2);
                });
            });

            describe('unknown option', () => {
                it('should return number if in default format', () => {
                    expect(def.valueToData(null, '<Unknown 3>')).toBe(3);
                });

                it('should throw an error if not in default format', () => {
                    expect(() => {
                        def.valueToData(null, '<Unknown Animal>');
                    }).toThrow(InvalidEnumValueError);
                });
            });
        });
    });
});
