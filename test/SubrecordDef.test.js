const DefinitionManager = require('../src/DefinitionManager');
const SubrecordDef = require('../src/defs/SubrecordDef');
const Def = require('../src/defs/Def');
const Subrecord = require('../src/elements/Subrecord');

const exampleSubrecord = {
    signature: 'ABCD',
    element: {
        name: 'Example',
        type: 'uint32'
    }
};

describe('SubrecordDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(SubrecordDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(SubrecordDef.prototype).toBeInstanceOf(Def);
        });

        it('should create a new instance', () => {
            def = new SubrecordDef(manager, exampleSubrecord, null);
            expect(def).toBeInstanceOf(SubrecordDef);
        });

        it('should set elementDef', () => {
            expect(def.elementDef).toBeDefined();
            expect(def.elementDef).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new SubrecordDef(manager, exampleSubrecord, null);
        });

        describe('initElement', () => {
            it('should return a new Subrecord', () => {
                let a = def.initElement();
                expect(a).toBeDefined();
                expect(a).toBeInstanceOf(Subrecord);
                expect(a.def).toBe(def);
                expect(a.container).toBeUndefined();
            });
        });
    });
});
