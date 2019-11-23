const DefinitionManager = require('../../src/DefinitionManager');
const IntegerDef = require('../../src/defs/IntegerDef');
const Int0Def = require('../../src/defs/Int0Def');
const EnumDef = require('../../src/defs/EnumDef');

const animalEnum = {
    type: 'enum',
    options: {
        0: 'Giraffe',
        1: 'Hippo',
        2: 'Lion'
    }
};

const exampleInt0 = {format: animalEnum};

describe('Int0Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(Int0Def).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new Int0Def(manager, {}, null);
            expect(def).toBeInstanceOf(Int0Def);
        });

        it('should extend IntegerDef', () => {
            expect(Int0Def.prototype).toBeInstanceOf(IntegerDef);
        });

        it('should initialize formatDef if def has format property', () => {
            let def = new Int0Def(manager, exampleInt0, null);
            expect(def.formatDef).toBeDefined();
            expect(def.formatDef).toBeInstanceOf(EnumDef)
        });
    });

    describe('instance methods', () => {
        let def, defWithEnum, element, stream;

        beforeAll(() => {
            def = new Int0Def(manager, {}, null);
            defWithEnum = new Int0Def(manager, exampleInt0, null);
            element = {_data: 0};
            stream = {read: jest.fn(() => new Buffer([]))};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                element._data = null;
                def.setData(element, 0);
                expect(element._data).toBe(0);
            });

            it('should set data to 0 if a higher value is passed', () => {
                def.setData(element, 255);
                expect(element._data).toBe(0);
            });

            it('should set data to 0 if a lower value is passed', () => {
                def.setData(element, -255);
                expect(element._data).toBe(0);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            describe('no format', () => {
                it('should convert data to a string', () => {
                    element._data = 0;
                    expect(def.getValue(element)).toBe('0');
                });
            });

            describe('with format', () => {
                it(`should call the formatDef's dataToValue function`, () => {
                    element._data = 0;
                    expect(defWithEnum.getValue(element)).toBe('Giraffe');
                });
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            describe('no format', () => {
                it('should parse integer value', () => {
                    def.setValue(element, '0');
                    expect(element._data).toBe(0);
                });
            });

            describe('with format', () => {
                it(`should call the formatDef's valueToData function`, () => {
                    defWithEnum.setValue(element, 'Giraffe');
                    expect(element._data).toBe(0);
                });
            });
        });

        describe('readData', () => {
            it('should be defined', () => {
                expect(def.readData).toBeDefined();
            });

            it('should return 0', () => {
                let data = def.readData(stream);
                expect(data).toBe(0);
            });
        });

        describe('size', () => {
            it('should be 0', () => {
                expect(def.size).toBe(0);
            });
        });
    });

    describe('static properties', () => {
        describe('MIN_VALUE', () => {
            it('should be 0', () => {
                expect(Int0Def.MIN_VALUE).toBe(0);
            });
        });

        describe('MAX_VALUE', () => {
            it('should be 0', () => {
                expect(Int0Def.MAX_VALUE).toBe(0);
            });
        });
    });
});
