const DefinitionManager = require('../../src/DefinitionManager');
const MemberUnionDef = require('../../src/defs/MemberUnionDef');
const MembersDef = require('../../src/defs/MembersDef');
const MemberUnion = require('../../src/elements/MemberUnion');
const ExpectedDefMembersError = require('../../src/errors/ExpectedDefMembersError');

const example = { members: [] };

describe('MemberUnionDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MemberUnionDef).toBeDefined();
        });

        it('should extend MembersDef', () => {
            expect(MemberUnionDef.prototype).toBeInstanceOf(MembersDef);
        });

        it('should throw an error if members undefined', () => {
            expect(() => {
                new MemberUnionDef(manager, {}, null);
            }).toThrow(ExpectedDefMembersError);
        });

        it('should create a new instance', () => {
            def = new MemberUnionDef(manager, example, null);
            expect(def).toBeInstanceOf(MemberUnionDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new MemberUnionDef(manager, example, null);
        });

        describe('initElement', () => {
            it('should return a new MemberUnion', () => {
                let m = def.initElement(null);
                expect(m).toBeDefined();
                expect(m).toBeInstanceOf(MemberUnion);
                expect(m.def).toBe(def);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "memberUnion"', () => {
                expect(MemberUnionDef.defType).toBe('memberUnion');
            });
        });
    });
});
