const DefinitionManager = require('../../src/DefinitionManager');
const StructDef = require('../../src/defs/StructDef');
const Def = require('../../src/defs/Def');
const {ExpectedDefPropertyError} = require('../../src/errors');
const {uint32, string} = require('../helpers/defHelpers');

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

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "struct"', () => {
                expect(StructDef.defType).toBe('struct');
            })
        })
    });
});
