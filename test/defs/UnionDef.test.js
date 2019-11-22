const DefinitionManager = require('../../src/DefinitionManager');
const UnionDef = require('../../src/defs/UnionDef');
const Union = require('../../src/elements/Union');
const Def = require('../../src/defs/Def');
const {ExpectedDefPropertyError, UnionDecideError} = require('../../src/errors');
const {uint32, string} = require('../helpers/defHelpers');

const example = {
    decider: 'ExampleDecider',
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

        it('should throw an error if decider is not provided', () => {
            expect(() => {
                new UnionDef(manager, {elements:[]} , null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should throw an error if def elements are not provided', () => {
            expect(() => {
                new UnionDef(manager, {decider:'A'} , null);
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

    describe('instance methods', () => {
        beforeAll(() => {
            def = new UnionDef(manager, example, null);
        });

        describe('getElementDef', () => {
            it('should throw an error if decide returns 0', () => {
                def.decide = () => 0;
                expect(() => {
                    def.getElementDef();
                }).toThrow(UnionDecideError);
            });

            it('should return the correct element def', () => {
                def.decide = () => 1;
                expect(def.getElementDef()).toBe(def.elementDefs[0]);
                def.decide = () => 2;
                expect(def.getElementDef()).toBe(def.elementDefs[1]);
            });
        });

        describe('load', () => {
            beforeAll(() => {
                Union.prototype.loadElement = jest.fn();
            });

            it('should return a new union element', () => {
                let u = def.load(null);
                expect(u).toBeDefined();
                expect(u).toBeInstanceOf(Union);
            })
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
