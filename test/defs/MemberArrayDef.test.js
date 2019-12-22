const DefinitionManager = require('../../src/setup/DefinitionManager');
const MemberArrayDef = require('../../src/defs/MemberArrayDef');
const Def = require('../../src/defs/Def');
const MemberArray = require('../../src/elements/MemberArray');
const {ExpectedDefPropertyError} = require('../../src/errors');
const {subrecord, uint32} = require('../helpers/defHelpers');

const example = {
    name: 'Example Member Array',
    member: subrecord('ABCD', uint32('Entry'))
};

describe('MemberArrayDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MemberArrayDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(MemberArrayDef.prototype).toBeInstanceOf(Def);
        });

        it('should throw an error if member def is not provided', () => {
            expect(() => {
                new MemberArrayDef(manager, {} , null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new MemberArrayDef(manager, example, null);
            expect(def).toBeInstanceOf(MemberArrayDef);
        });

        it('should set memberDef', () => {
            expect(def.memberDef).toBeDefined();
            expect(def.memberDef).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new MemberArrayDef(manager, example, null);
        });

        describe('initElement', () => {
            it('should return a new MemberArrayElement', () => {
                let a = def.initElement();
                expect(a).toBeDefined();
                expect(a).toBeInstanceOf(MemberArray);
                expect(a.def).toBe(def);
                expect(a.container).toBeUndefined();
            });
        });
    });
});
