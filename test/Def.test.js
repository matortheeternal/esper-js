const DefinitionManager = require('../src/DefinitionManager');
const Def = require('../src/defs/Def');

describe('Def', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(Def).toBeDefined();
        });

        it('should create a new instance', () => {
            def = new Def(manager, {prop: 1}, null);
            expect(def).toBeInstanceOf(Def);
        });

        it(`should assign the def's properties to the class instance`, () => {
            expect(def.prop).toBe(1);
        });

        it('should assign parent if truthy', () => {
            expect(def.hasOwnProperty('parent')).toBe(false);
            let parent = def;
            def = new Def(manager, {}, parent);
            expect(def.parent).toBe(parent);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new Def(manager, {}, null);
        });

        describe('containsSignature', () => {
            it('should be defined', () => {
                expect(def.containsSignature).toBeDefined();
            });

            it('should return false', () => {
                expect(def.containsSignature('ABCD')).toBe(false);
            });
        });
    });
});
