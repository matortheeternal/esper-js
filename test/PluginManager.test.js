const PluginManager = require('../src/PluginManager');

describe('PluginManager', () => {
    describe('constructor', () => {
        let pluginManager;

        it('should be defined', () => {
            expect(PluginManager).toBeDefined();
        });

        it('should create a new instance', () => {
            pluginManager = new PluginManager('TES5');
            expect(pluginManager).toBeDefined();
        });

        it('should initialize files array', () => {
            expect(pluginManager._files).toBeDefined();
        });

        it('should initialize dummyFiles array', () => {
            expect(pluginManager._dummyFiles).toBeDefined();
        });
    });

    describe('instance methods', () => {
        let pluginManager;

        beforeAll(() => {
            pluginManager = new PluginManager('TES5');
        });

        describe('findOrCreateDummyFile', () => {
            let dummyFile;

            it('should create dummy file if not present', () => {
                dummyFile = pluginManager.findOrCreateDummyFile('Test.esp');
                expect(dummyFile).toBeDefined();
                expect(dummyFile.filename).toBe('Test.esp');
                expect(dummyFile.dummy).toBe(true);
            });

            it('should return existing dummy file', () => {
                let dummyFile2 = pluginManager.findOrCreateDummyFile('Test.esp');
                expect(dummyFile2).toBeDefined();
                expect(dummyFile2).toBe(dummyFile);
            });
        });

        describe('getFileByName', () => {
            it('should return undefined if file is not found', () => {
                let file = pluginManager.getFileByName('Test.esp');
                expect(file).toBeUndefined();
            });

            it('should return the file if found', () => {
                let file = {filename: 'Fake.esp'};
                pluginManager._files.push(file);
                let file2 = pluginManager.getFileByName('Fake.esp');
                expect(file2).toBeDefined();
                expect(file).toBe(file2);
            });

            it('should return dummy file if returnDummies is passed', () => {
                let dummyFile = pluginManager._dummyFiles[0],
                    file = pluginManager.getFileByName('Test.esp', true);
                expect(file).toBeDefined();
                expect(file).toBe(dummyFile);
            });
        });

        describe('getFileByIndex', () => {
            it('should return undefined if index is negative', () => {
                let file = pluginManager.getFileByIndex(-1);
                expect(file).toBeUndefined();
            });

            it('should return undefined if index exceeds file count', () => {
                let file = pluginManager.getFileByIndex(999);
                expect(file).toBeUndefined();
            });

            it('should return the file at the index', () => {
                let file = pluginManager.getFileByIndex(0);
                expect(file).toBeDefined();
                expect(file).toBe(pluginManager._files[0]);
            });
        });

        describe('addFile', () => {
            it('should push the file onto the files array', () => {
                let file = {filename: 'New File.esp'};
                pluginManager.addFile(file);
                expect(pluginManager._files.length).toBe(2);
                expect(file).toBe(pluginManager._files[1]);
            });
        });
    });
});
