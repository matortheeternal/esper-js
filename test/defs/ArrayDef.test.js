const DefinitionManager = require('../../src/setup/DefinitionManager');
const ArrayDef = require('../../src/defs/ArrayDef');
const Def = require('../../src/defs/Def');
const ElementArray = require('../../src/elements/ElementArray');
const {ExpectedDefPropertyError} = require('../../src/errors');

const basicArray = {
    name: 'Basic Array',
    element: {
        name: 'Number',
        type: 'uint32'
    }
};

describe('ArrayDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(ArrayDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(ArrayDef.prototype).toBeInstanceOf(Def);
        });

        it('should throw an error if element def is not provided', () => {
            expect(() => {
                new ArrayDef(manager, {} , null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new ArrayDef(manager, basicArray, null);
            expect(def).toBeInstanceOf(ArrayDef);
        });

        it('should set elementDef', () => {
            expect(def.elementDef).toBeDefined();
            expect(def.elementDef).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new ArrayDef(manager, basicArray, null);
        });

        describe('load', () => {
            it('should return a new ArrayElement', () => {
                let a = def.load();
                expect(a).toBeDefined();
                expect(a).toBeInstanceOf(ElementArray);
                expect(a.def).toBe(def);
                expect(a.container).toBeUndefined();
            });
        });
    });
});
