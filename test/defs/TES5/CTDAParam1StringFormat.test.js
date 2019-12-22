const DefinitionManager = require('../../../src/setup/DefinitionManager');
const CTDAParam1StringFormat = require(
    '../../../src/defs/TES5/CTDAParam1StringFormat'
);
const FormatDef = require('../../../src/defs/FormatDef');

describe('CTDAParam1StringFormat', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(CTDAParam1StringFormat).toBeDefined();
        });

        it('should extend FormatDef', () => {
            expect(CTDAParam1StringFormat.prototype).toBeInstanceOf(FormatDef);
        });

        it('should create a new instance', () => {
            let a = new CTDAParam1StringFormat(manager, {}, null);
            expect(a).toBeDefined();
            expect(a).toBeInstanceOf(CTDAParam1StringFormat);
        });
    });

    describe('instance methods', () => {
        let def, element;

        beforeAll(() => {
            def = new CTDAParam1StringFormat(manager, {}, null);
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
                expect(element.getValue).toHaveBeenCalledWith('..\\..\\CIS1');
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
                    .toHaveBeenCalledWith('..\\..\\CIS1', 'value');
            });
        });
    });

    describe('static properties', () => {
        describe('name', () => {
            it('should be "CTDAParam1StringFormat"', () => {
                expect(CTDAParam1StringFormat.name)
                    .toBe('CTDAParam1StringFormat');
            })
        })
    })
});
