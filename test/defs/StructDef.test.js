const DefinitionManager = require('../../src/setup/DefinitionManager');
const StructDef = require('../../src/defs/StructDef');
const Struct = require('../../src/elements/Struct');
const Def = require('../../src/defs/Def');
const {ExpectedDefPropertyError} = require('../../src/errors');
const {uint32, string} = require('../testHelpers/defHelpers');

const example = {
    elements: [
        uint32('Number'),
        string('Text')
    ]
};

describe('StructDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(StructDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(StructDef.prototype).toBeInstanceOf(Def);
        });

        it('should throw an error if def elements are not provided', () => {
            expect(() => {
                new StructDef(manager, {} , null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new StructDef(manager, example, null);
            expect(def).toBeInstanceOf(StructDef);
        });

        it('should set elementDefs', () => {
            expect(def.elementDefs).toBeDefined();
            expect(def.elementDefs[0]).toBeInstanceOf(Def);
            expect(def.elementDefs[1]).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new StructDef(manager, {elements:[]}, null);
        });

        describe('load', () => {
            it('should return a struct element', () => {
                let s = def.load(null);
                expect(s).toBeDefined();
                expect(s).toBeInstanceOf(Struct);
                expect(s.def).toBe(def);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "struct"', () => {
                expect(StructDef.defType).toBe('struct');
            })
        })
    });
});
