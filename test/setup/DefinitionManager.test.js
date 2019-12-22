const DefinitionManager = require('../../src/setup/DefinitionManager');

describe('DefinitionManager', () => {

    describe('constructor', () => {
        let definitionManager;

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
            expect(definitionManager._defClasses).toBeDefined();
        });

        it('should set defs', () => {
            expect(definitionManager._defs).toBeDefined();
        });

        it('should set recordDefs', () => {
            expect(definitionManager._recordDefs).toBeDefined();
        });
    });

    describe('instance methods', () => {
        let definitionManager;

        beforeAll(() => {
            definitionManager = new DefinitionManager('TES5');
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

        describe('resolveRecordDef', () => {
            it('should throw an error if record def does not exist', () => {
                expect(() => {
                    definitionManager.resolveRecordDef('abcd');
                }).toThrow('Failed to resolve record def: abcd');
            });

            it('should return the record def', () => {
                let armoDef = definitionManager.resolveRecordDef('ARMO');
                expect(armoDef).toBeDefined();
            });
        });

        describe('buildDef', () => {
            it('should return a new instance of a def class', () => {
                let src = {
                    name: 'Unknown',
                    type: 'bytes',
                    size: 4
                };
                let defInstance = definitionManager.buildDef(src);

                expect(defInstance).toBeDefined();
                expect(defInstance.src).toEqual(src);
            });

            it('should resolve referenced defs and merge them', () => {
                let src = {
                    id: 'ByteColors',
                    name: 'Testing'
                };
                let defInstance = definitionManager.buildDef(src);

                expect(defInstance).toBeDefined();
                expect(defInstance.src.name).toEqual('Testing');
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
                expect(builtDefs[0].src.name).toBe('Unknown');
                expect(builtDefs[0].constructor.name).toBe('BytesDef');
                expect(builtDefs[1]).toBeDefined();
                expect(builtDefs[1].src.name).toBe('Description');
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
});
