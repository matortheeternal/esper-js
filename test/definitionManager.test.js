const DefinitionManager = require('../src/DefinitionManager');

describe('Definition Manager', () => {
    let definitionManager;

    describe('constructor', () => {
        it('should be defined', () => {
            expect(DefinitionManager).toBeDefined();
        });

        it('should fail if definitions not found', () => {
            expect(() => {
                new DefinitionManager('ABCD')
            }).toThrow(/Couldn't find definitions for game ABCD./);
        });

        it('should create a new instance', () => {
            definitionManager = new DefinitionManager('TES5');
            expect(definitionManager).toBeDefined();
        });

        it('should load def classes', () => {
            expect(definitionManager.defClasses).toBeDefined();
        });

        it('should set defs', () => {
            expect(definitionManager.defs).toBeDefined();
        });

        it('should set recordDefs', () => {
            expect(definitionManager.recordDefs).toBeDefined();
        });
    });

    describe('resolveDef', () => {
        it('should throw an error if def does not exist', () => {
            expect(() => {
                definitionManager.resolveDef('1234567');
            }).toThrow('Failed to resolve def: 1234567');
        });

        it('should return the def', () => {
            let BODT = definitionManager.resolveDef('BODT');
            expect(BODT).toBeDefined();
        });
    });

    describe('resolveDefClass', () => {
        it('should throw an error if def class does not exist', () => {
            expect(() => {
                definitionManager.resolveDefClass('abcd');
            }).toThrow('Failed to resolve def class: abcd');
        });

        it('should return the def class', () => {
            let StringDef = definitionManager.resolveDefClass('string');
            expect(StringDef).toBeDefined();
        });
    });

    describe('buildDef', () => {
        it('should return a new instance of a def class', () => {
            let defInstance = definitionManager.buildDef({
                name: 'Unknown',
                type: 'bytes',
                size: 4
            });

            expect(defInstance).toBeDefined();
            expect(defInstance.name).toBe('Unknown');
            expect(defInstance.size).toBe(4);
            expect(defInstance.constructor.name).toBe('BytesDef');
        });

        it('should resolve referenced defs and merge them', () => {
            let defInstance = definitionManager.buildDef({
                id: 'ByteColors',
                name: 'Testing'
            });

            expect(defInstance).toBeDefined();
            expect(defInstance.name).toBe('Testing');
            expect(defInstance.constructor.name).toBe('StructDef');
        });
    });

    describe('buildDefs', () => {
        it('should return built defs', () => {
            let builtDefs = definitionManager.buildDefs([{
                name: 'Unknown',
                type: 'bytes',
                size: 4
            }, {
                name: 'Description',
                type: 'string'
            }]);

            expect(builtDefs).toBeDefined();
            expect(builtDefs).toBeInstanceOf(Array);
            expect(builtDefs.length).toBe(2);
            expect(builtDefs[0]).toBeDefined();
            expect(builtDefs[0].name).toBe('Unknown');
            expect(builtDefs[0].constructor.name).toBe('BytesDef');
            expect(builtDefs[1]).toBeDefined();
            expect(builtDefs[1].name).toBe('Description');
            expect(builtDefs[1].constructor.name).toBe('StringDef');
        });

        it('should set sort order', () => {
            let builtDefs = definitionManager.buildDefs([{
                name: 'Unknown',
                type: 'bytes',
                size: 4
            }, {
                name: 'Description',
                type: 'string'
            }]);

            expect(builtDefs[0].sortOrder).toBe(0);
            expect(builtDefs[1].sortOrder).toBe(1);
        });
    });
});
