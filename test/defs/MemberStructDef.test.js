const DefinitionManager = require('../../src/DefinitionManager');
const MemberStructDef = require('../../src/defs/MemberStructDef');
const MembersDef = require('../../src/defs/MembersDef');
const MemberStruct = require('../../src/elements/MemberStruct');
const ExpectedDefMembersError = require('../../src/errors/ExpectedDefMembersError');

const example = { members: [] };

describe('MemberStructDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MemberStructDef).toBeDefined();
        });

        it('should extend MembersDef', () => {
            expect(MemberStructDef.prototype).toBeInstanceOf(MembersDef);
        });

        it('should throw an error if members undefined', () => {
            expect(() => {
                new MemberStructDef(manager, {}, null);
            }).toThrow(ExpectedDefMembersError);
        });

        it('should create a new instance', () => {
            def = new MemberStructDef(manager, example, null);
            expect(def).toBeInstanceOf(MemberStructDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new MemberStructDef(manager, example, null);
        });

        describe('initElement', () => {
            it('should return a new MemberStruct', () => {
                let m = def.initElement(null);
                expect(m).toBeDefined();
                expect(m).toBeInstanceOf(MemberStruct);
                expect(m.def).toBe(def);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "memberStruct"', () => {
                expect(MemberStructDef.defType).toBe('memberStruct');
            });
        });
    });
});
