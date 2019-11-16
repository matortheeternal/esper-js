const FileManager = require('../src/FileManager');

describe('FileManager', () => {
    describe('constructor', () => {
        let fileManager;

        it('should be defined', () => {
            expect(FileManager).toBeDefined();
        });

        it('should create a new instance', () => {
            fileManager = new FileManager('TES5');
            expect(fileManager).toBeDefined();
        });

        it('should initialize files array', () => {
            expect(fileManager._files).toBeDefined();
        });

        it('should initialize dummyFiles array', () => {
            expect(fileManager._dummyFiles).toBeDefined();
        });
    });

    describe('instance methods', () => {
        let fileManager;

        beforeAll(() => {
            fileManager = new FileManager('TES5');
        });

        describe('findOrCreateDummyFile', () => {
            let dummyFile;

            it('should create dummy file if not present', () => {
                dummyFile = fileManager.findOrCreateDummyFile('Test.esp');
                expect(dummyFile).toBeDefined();
                expect(dummyFile.filename).toBe('Test.esp');
                expect(dummyFile.dummy).toBe(true);
            });

            it('should return existing dummy file', () => {
                let dummyFile2 = fileManager.findOrCreateDummyFile('Test.esp');
                expect(dummyFile2).toBeDefined();
                expect(dummyFile2).toBe(dummyFile);
            });
        });

        describe('getFileByName', () => {
            it('should return undefined if file is not found', () => {
                let file = fileManager.getFileByName('Test.esp');
                expect(file).toBeUndefined();
            });

            it('should return the file if found', () => {
                let file = {filename: 'Fake.esp'};
                fileManager._files.push(file);
                let file2 = fileManager.getFileByName('Fake.esp');
                expect(file2).toBeDefined();
                expect(file).toBe(file2);
            });

            it('should return dummy file if returnDummies is passed', () => {
                let dummyFile = fileManager._dummyFiles[0],
                    file = fileManager.getFileByName('Test.esp', true);
                expect(file).toBeDefined();
                expect(file).toBe(dummyFile);
            });
        });

        describe('getFileByIndex', () => {
            it('should return undefined if index is negative', () => {
                let file = fileManager.getFileByIndex(-1);
                expect(file).toBeUndefined();
            });

            it('should return undefined if index exceeds file count', () => {
                let file = fileManager.getFileByIndex(999);
                expect(file).toBeUndefined();
            });

            it('should return the file at the index', () => {
                let file = fileManager.getFileByIndex(0);
                expect(file).toBeDefined();
                expect(file).toBe(fileManager._files[0]);
            });
        });

        describe('addFile', () => {
            it('should push the file onto the files array', () => {
                let file = {filename: 'New File.esp'};
                fileManager.addFile(file);
                expect(fileManager._files.length).toBe(2);
                expect(file).toBe(fileManager._files[1]);
            });
        });
    });
});
