const DefinitionManager = require('../../src/DefinitionManager');
const UnionDef = require('../../src/defs/UnionDef');
const Def = require('../../src/defs/Def');
const {ExpectedDefPropertyError} = require('../../src/errors');
const {uint32, string} = require('../helpers/defHelpers');

const example = {
    elements: [
        uint32('Number'),
        string('Text')
    ]
};

describe('UnionDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(UnionDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(UnionDef.prototype).toBeInstanceOf(Def);
        });

        it('should throw an error if def elements are not provided', () => {
            expect(() => {
                new UnionDef(manager, {} , null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new UnionDef(manager, example, null);
            expect(def).toBeInstanceOf(UnionDef);
        });

        it('should set elementDefs', () => {
            expect(def.elementDefs).toBeDefined();
            expect(def.elementDefs[0]).toBeInstanceOf(Def);
            expect(def.elementDefs[1]).toBeInstanceOf(Def);
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "union"', () => {
                expect(UnionDef.defType).toBe('union');
            })
        })
    });
});
