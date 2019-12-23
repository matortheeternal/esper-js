const Session = require('../../src/setup/Session');
const PluginFile = require('../../src/elements/PluginFile');
const {testElements} = require('../testHelpers/elementHelpers');
const path = require('path');

describe('globals.esp', () => {
    let session, globalsFile;

    beforeAll(() => {
        session = new Session('TES5');
    });

    it('should load without errors', () => {
        let filePath = path.resolve('./test/resources/globals.esp');
        globalsFile = PluginFile.load(session, filePath);
    });

    describe('masters', () => {
        it('should be defined', () => {
            expect(globalsFile._masters).toBeDefined();
        });

        it('should have only Skyrim.esm', () => {
            expect(globalsFile._masters.length).toBe(1);
            expect(globalsFile._masters[0].filename).toBe('Skyrim.esm');
        });
    });

    describe('elements', () => {
        it('should be defined', () => {
            expect(globalsFile._elements).toBeDefined();
        });

        it('should have GLOB group', () => {
            expect(globalsFile._elements.length).toBe(2);
            //let group = globalsFile._elements[1];
            //expect(group.label).toBe('GLOB');
        });

        describe('GLOB', () => {
            let globGroup;

            beforeAll(() => {
                globGroup = globalsFile._elements[1];
            });

            it('should contain two records', () => {
                expect(globGroup._elements.length).toBe(3);
            });

            describe('first record', () => {
                let firstRecord;

                beforeAll(() => {
                    firstRecord = globGroup._elements[1];
                });

                describe('label', () => {
                    it('should be GLOB', () => {
                        expect(firstRecord.signature).toBe('GLOB');
                    });
                });

                describe('formId', () => {
                    it('should be {Skyrim.esm:000035}', () => {
                        let fidStr = firstRecord.formId.toString();
                        expect(fidStr).toBe('{Skyrim.esm:000035}');
                    });
                });

                testElements(() => firstRecord, [{
                    path: 'EDID',
                    name: 'EDID - Editor ID',
                    value: 'GameYear'
                }, {
                    path: 'FNAM',
                    name: 'FNAM - Type',
                    value: '<Unknown 115>'
                }, {
                    path: 'FLTV',
                    name: 'FLTV - Value',
                    value: '201.00000'
                }]);
            });
        });
    });
});
