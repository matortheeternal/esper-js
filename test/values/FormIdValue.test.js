const FormIdValue = require('../../src/values/FormIdValue');
const {plugin, makeDummyFile} = require('../testHelpers/elementHelpers');
const {MissingMasterError} = require('../../src/errors');

describe('FormIdValue', () => {
    let skyrim, file, file2;

    beforeAll(() => {
        skyrim = makeDummyFile('Skyrim.esm');
        file = plugin({
            filename: 'File.esp',
            _masters: [skyrim]
        });
        file2 = plugin({
            filename: 'File2.esp',
            _masters: [skyrim]
        });
    });

    describe('constructor', () => {
        let fid;

        it('should be defined', () => {
            expect(FormIdValue).toBeDefined();
        });

        it('should create a new instance', () => {
            fid = new FormIdValue({filename: 'Skyrim.esm'}, 0x123456);
            expect(fid).toBeDefined();
            expect(fid).toBeInstanceOf(FormIdValue);
        });

        it('should set file', () => {
            expect(fid.file).toEqual({filename: 'Skyrim.esm'});
        });

        it('should set localFormId', () => {
            expect(fid.localFormId).toBe(0x123456);
        });
    });

    describe('static methods', () => {
        describe('getFormIdParts', () => {
            it('should return the ordinal and localFormId', () => {
                let a = FormIdValue.getFormIdParts(0x12345678);
                expect(a).toBeDefined();
                expect(a).toBeInstanceOf(Array);
                expect(a.length).toBe(2);
                expect(a[0]).toBe(0x12);
                expect(a[1]).toBe(0x345678);
            });
        });

        describe('fromFileFormId', () => {
            it('should return a new FormIdValue', () => {
                let f = FormIdValue.fromFileFormId(file, 0x00123456);
                expect(f).toBeDefined();
                expect(f).toBeInstanceOf(FormIdValue);
                expect(f.file).toBe(file._masters[0]);
                expect(f.localFormId).toBe(0x123456);
            });
        });

        describe('fromElement', () => {
            let element;

            beforeAll(() => {
                element = {file, _data: 0x01234567};
            });

            it('should return a new FormIdValue', () => {
                let f = FormIdValue.fromElement(element);
                expect(f).toBeDefined();
                expect(f).toBeInstanceOf(FormIdValue);
                expect(f.file).toBe(file);
                expect(f.localFormId).toBe(0x234567);
            });
        });
    });

    describe('instance methods', () => {
        let fid, fid2;

        beforeAll(() => {
            fid = FormIdValue.fromFileFormId(file, 0x00123456);
            fid2 = FormIdValue.fromFileFormId(file, 0x01234567);
        });

        describe('toFileFormId', () => {
            it('should throw an error if target file does not have master', () => {
                expect(() => {
                    fid2.toFileFormId(file2);
                }).toThrow(MissingMasterError);
            });

            it('should return the correct file form ID', () => {
                expect(fid.toFileFormId(file)).toBe(0x00123456);
                expect(fid2.toFileFormId(file)).toBe(0x01234567);
                expect(fid.toFileFormId(file2)).toBe(0x00123456);
            });
        });

        describe('toString', () => {
            it('should return {filename:localFormId}', () => {
                expect(fid.toString()).toBe('{Skyrim.esm:123456}');
                expect(fid2.toString()).toBe('{File.esp:234567}');
            });
        });

        describe('isNull', () => {
            beforeAll(() => fid2.localFormId = 0);
            afterAll(() => fid2.localFormId = 0x234567);

            it('should return false if localFormId is non-zero', () => {
                expect(fid.isNull()).toBe(false);
            });

            it('should return true if localFormId is zero', () => {
                expect(fid2.isNull()).toBe(true);
            });
        });

        describe('resolveRecord', () => {
            beforeAll(() => {
                fid.file.getRecordByFormId = jest.fn(() => ({}));
            });

            it('should return record', () => {
                let rec = fid.resolveRecord();
                expect(rec).toBeDefined();
                expect(rec).toEqual({});
            });

            it('should call getRecordByFormId', () => {
                expect(fid.file.getRecordByFormId).toHaveBeenCalledTimes(1);
                expect(fid.file.getRecordByFormId).toHaveBeenCalledWith(fid);
            });
        });
    });
});
