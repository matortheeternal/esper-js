const DefinitionManager = require('../../src/setup/DefinitionManager');
const MaybeSubrecordDef = require('../../src/defs/MaybeSubrecordDef');
const Def = require('../../src/defs/Def');

const exampleSubrecord = {
    signature: 'ABCD',
    name: 'Example',
    type: 'uint32'
};

describe('MaybeSubrecordDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MaybeSubrecordDef).toBeDefined();
        });

        it('should extend Def', () => {
            expect(MaybeSubrecordDef.prototype).toBeInstanceOf(Def);
        });

        it('should create a new instance', () => {
            def = new MaybeSubrecordDef(manager, exampleSubrecord, null);
            expect(def).toBeInstanceOf(MaybeSubrecordDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new MaybeSubrecordDef(manager, exampleSubrecord, null);
        });
    });
});
