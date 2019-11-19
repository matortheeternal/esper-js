const DefinitionManager = require('../src/DefinitionManager');
const MembersDef = require('../src/defs/MembersDef');
const Def = require('../src/defs/Def');
const Element = require('../src/elements/Element');
const ExpectedDefMembersError = require('../src/errors/ExpectedDefMembersError');
const UnknownSignatureError = require('../src/errors/UnknownSignatureError');
const {subrecord, uint32, float, string} = require('./helpers/defHelpers');
const {sortedContainer} = require('./helpers/elementHelpers');

Element.load = jest.fn();

const example = {
    members: [
        subrecord('TNG1', uint32('Thing 1')),
        subrecord('TNG2', float('Thing 2')),
        subrecord('FULL', string('Name'))
    ]
};

describe('MembersDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MembersDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(MembersDef.prototype).toBeInstanceOf(Def);
        });

        it('should throw an error if members undefined', () => {
            expect(() => {
                new MembersDef(manager, {}, null);
            }).toThrow(ExpectedDefMembersError);
        });

        it('should create a new instance', () => {
            def = new MembersDef(manager, example, null);
            expect(def).toBeInstanceOf(MembersDef);
        });

        it('should set memberDefs', () => {
            expect(def.memberDefs).toBeDefined();
            expect(def.memberDefs).toBeInstanceOf(Array);
            expect(def.memberDefs.length).toBe(3);
            expect(def.memberDefs[0]).toBeInstanceOf(Def);
            expect(def.memberDefs[1]).toBeInstanceOf(Def);
            expect(def.memberDefs[2]).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def, container;

        beforeAll(() => {
            def = new MembersDef(manager, example, null);
            container = sortedContainer(def);
        });

        describe('getMemberDef', () => {
            it('should return the matching member', () => {
                let memberDef = def.getMemberDef('FULL');
                expect(memberDef).toBeDefined();
                expect(memberDef).toBeInstanceOf(Def);
                expect(memberDef.signature).toBe('FULL');
            });
        });

        describe('containsSignature', () => {
            describe('matching def exists', () => {
                it('should return true', () => {
                    expect(def.containsSignature('TNG2')).toBe(true);
                });
            });

            describe('matching def does not exist', () => {
                it('should return false', () => {
                    expect(def.containsSignature('4321')).toBe(false);
                    expect(def.containsSignature('tng1')).toBe(false);
                });
            });
        });

        describe('getOrInitElement', () => {
            let testGetOrInitElement = n => {
                let memberDef = def.memberDefs[n],
                    e = def.getOrInitElement(container, memberDef);
                expect(e).toBeDefined();
                expect(e).toBeInstanceOf(Element);
                expect(container._elements[n]).toBe(e);
                return e;
            };

            it('should initialize non-existent elements', () => {
                testGetOrInitElement(0);
                testGetOrInitElement(2);
            });

            it('should return existing elements', () => {
                let e = container._elements[2];
                expect(testGetOrInitElement(2)).toBe(e);
            });
        });

        describe('loadElement', () => {
            it('should throw an error if a matching member def is not found', () => {
                expect(() => {
                    def.loadElement(container, 'A1B2');
                }).toThrow(UnknownSignatureError);
            });

            it('should initialize non-existent elements', () => {
                def.loadElement(container, 'TNG2');
                let e = container._elements[1];
                expect(e).toBeDefined();
                expect(e).toBeInstanceOf(Element);
            });

            it('should call subrecordFound', () => {
                expect(Element.load).toHaveBeenCalledTimes(1);
            });
        });
    });
});
