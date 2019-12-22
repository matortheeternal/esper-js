const DefinitionManager = require('../../src/setup/DefinitionManager');
const FormatUnionDef = require('../../src/defs/FormatUnionDef');
const FormatDef = require('../../src/defs/FormatDef');
const {ExpectedDefPropertyError, UnionDecideError} = require('../../src/errors');

const example = {
    decider: 'ExampleDecider',
    formats: [{
        type: 'flags',
        flags: {
            0: 'Flag 0',
            1: 'Flag 1',
            2: 'Flag 2'
        }
    }, {
        type: 'enum',
        options: {
            0: 'Option 0',
            1: 'Option 1',
            2: 'Option 2'
        }
    }]
};

describe('FormatUnionDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(FormatUnionDef).toBeDefined();
        });

        it('should throw an error if decider is not provided', () => {
            expect(() => {
                new FormatUnionDef(manager, {}, null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should throw an error if formats is not provided', () => {
            expect(() => {
                new FormatUnionDef(manager, {decider:'A'}, null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new FormatUnionDef(manager, example, null);
            expect(def).toBeInstanceOf(FormatUnionDef);
        });

        it('should extend def', () => {
            expect(FormatUnionDef.prototype).toBeInstanceOf(FormatDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new FormatUnionDef(manager, example, null);
            def.decide = () => 0;
        });

        describe('getFormatDef', () => {
            it('should throw an error if decide returns 0', () => {
                expect(() => {
                    def.getFormatDef(null);
                }).toThrow(UnionDecideError);
            });

            it('should return the formatDef', () => {
                def.decide = () => 1;
                expect(def.getFormatDef()).toBe(def.formatDefs[0]);
                def.decide = () => 2;
                expect(def.getFormatDef()).toBe(def.formatDefs[1]);
            });
        });

        describe('dataToValue', () => {
            it('should be defined', () => {
                expect(def.dataToValue).toBeDefined();
            });

            it('should call dataToValue on the correct format def', () => {
                def.decide = () => 2;
                expect(def.dataToValue(null, 1)).toBe('Option 1');
                def.decide = () => 1;
                expect(def.dataToValue(null, 2)).toBe('Flag 1');
            });
        });

        describe('valueToData', () => {
            it('should be defined', () => {
                expect(def.valueToData).toBeDefined();
            });

            it('should call valueToData on the correct format def', () => {
                def.decide = () => 2;
                expect(def.valueToData(null, 'Option 1')).toBe(1);
                def.decide = () => 1;
                expect(def.valueToData(null, 'Flag 1')).toBe(2);
            });
        });
    });
});
