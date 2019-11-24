const Session = require('../../src/Session');
const PluginFile = require('../../src/elements/PluginFile');
const path = require('path');

describe('empty.esp', () => {
    let session, emptyFile;

    beforeAll(() => {
        session = new Session('TES5');
    });

    it('should load without errors', () => {
        let filePath = path.resolve('./test/resources/empty.esp');
        emptyFile = PluginFile.load(session, filePath);
    });

    describe('file header', () => {
        it('should be defined', () => {
            expect(emptyFile.fileHeader).toBeDefined();
        });

        describe('members', () => {
            describe('HEDR', () => {
                let element;

                beforeAll(() => {
                    element = emptyFile.fileHeader.getElement('HEDR');
                });

                it('should be present', () => {
                    expect(element).toBeDefined();
                    expect(element.signature).toBe('HEDR');
                });

                it('should have size', () => {
                    expect(element.size).toBe(12);
                });

                describe('Version', () => {
                    let version;

                    beforeAll(() => {
                        version = element.getElement('Version');
                    });

                    it('should be present', () => {
                        expect(version).toBeDefined();
                    });

                    it('should have size', () => {
                        expect(version.size).toBe(4);
                    });

                    it('should have value', () => {
                        expect(version.value).toBe('1.70000');
                    });
                });

                describe('Number of Records', () => {
                    let numRecords;

                    beforeAll(() => {
                        numRecords = element.getElement('Number of Records');
                    });

                    it('should be present', () => {
                        expect(numRecords).toBeDefined();
                    });

                    it('should have size', () => {
                        expect(numRecords.size).toBe(4);
                    });

                    it('should have value', () => {
                        expect(numRecords.value).toBe('0');
                    });
                });

                describe('Next Object ID', () => {
                    let nextId;

                    beforeAll(() => {
                        nextId = element.getElement('Next Object ID');
                    });

                    it('should be present', () => {
                        expect(nextId).toBeDefined();
                    });

                    it('should have size', () => {
                        expect(nextId.size).toBe(4);
                    });

                    it('should have value', () => {
                        expect(nextId.value).toBe('2048');
                    });
                });
            });

            describe('CNAM', () => {
                let element;

                beforeAll(() => {
                    element = emptyFile.fileHeader.getElement('CNAM');
                });

                it('should be present', () => {
                    expect(element).toBeDefined();
                    expect(element.signature).toBe('CNAM');
                });

                it('should have size', () => {
                    expect(element.size).toBe(6);
                });

                it('should have value', () => {
                    expect(element.value).toBe('Mator');
                });
            });
        });
    });
});
