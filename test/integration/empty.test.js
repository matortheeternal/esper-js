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
