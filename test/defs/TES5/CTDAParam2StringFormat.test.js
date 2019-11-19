const DefinitionManager = require('../../../src/DefinitionManager');
const CTDAParam2StringFormat = require(
    '../../../src/defs/TES5/CTDAParam2StringFormat'
);
const FormatDef = require('../../../src/defs/FormatDef');

describe('CTDAParam2StringFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(CTDAParam2StringFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(CTDAParam2StringFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new CTDAParam2StringFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(CTDAParam2StringFormat);
        });
    });

    describe('instance methods', () => {
        let def, element;

        beforeAll(() => {
            def = new CTDAParam2StringFormat(manager, {}, null);
            element = {
                getValue: jest.fn(() => ''),
                setValue: jest.fn()
            };
        });

        describe('dataToValue', () => {
            it('should call element.getValue', () => {
                let r = def.dataToValue(element);
                expect(r).toBe('');
                expect(element.getValue).toHaveBeenCalledTimes(1);
                expect(element.getValue).toHaveBeenCalledWith('..\\..\\CIS2');
            });
        });

        describe('valueToData', () => {
            it('should return 0', () => {
                let r = def.valueToData(element, 'value');
                expect(r).toBe(0);
            });

            it('should call element.setValue', () => {
                expect(element.setValue).toHaveBeenCalledTimes(1);
                expect(element.setValue)
                    .toHaveBeenCalledWith('..\\..\\CIS2', 'value');
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "CTDAParam2StringFormat"', () => {
                expect(CTDAParam2StringFormat.name)
                    .toBe('CTDAParam2StringFormat');
            })
        })
    })
});
