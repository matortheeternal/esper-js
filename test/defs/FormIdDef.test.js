const DefinitionManager = require('../../src/DefinitionManager');
const FormIdValue = require('../../src/FormIdValue');
const UInt32Def = require('../../src/defs/UInt32Def');
const FormIdDef = require('../../src/defs/FormIdDef');
const {plugin, makeDummyFile} = require('../helpers/elementHelpers');

describe('FormIdDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(FormIdDef).toBeDefined();
        });

        it('should create a new instance', () => {
            let def = new FormIdDef(manager, {}, null);
            expect(def).toBeInstanceOf(FormIdDef);
        });

        it('should extend UInt32Def', () => {
            expect(FormIdDef.prototype).toBeInstanceOf(UInt32Def);
        });

        it('should throw an error if def has format property', () => {
            expect(() => {
                new FormIdDef(manager, {format:{}}, null)
            }).toThrow('FormId cannot have format.');
        });
    });

    describe('instance methods', () => {
        let def, element, basicFile, stream;

        beforeAll(() => {
            def = new FormIdDef(manager, {}, null);
            basicFile = plugin({
                filename: 'Basic.esp',
                _masters: [makeDummyFile('Skyrim.esm')]
            });
            element = {file: basicFile, _data: 0};
            let b = new Buffer([0x3E, 0xAE, 0x01, 0x00]);
            stream = {read: jest.fn(() => b)};
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });

            it('should set element data', () => {
                def.setData(element, 0x00123456);
                expect(element._data).toBe(0x00123456);
            });

            it('should set data to 0xFFFFFFFF if a higher value is passed', () => {
                def.setData(element, Math.pow(2, 40));
                expect(element._data).toBe(0xFFFFFFFF);
            });

            it('should set data to 0 if a lower value is passed', () => {
                def.setData(element, -1);
                expect(element._data).toBe(0);
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });

            it('should convert data to a FormIdValue', () => {
                element._data = 0x00654321;
                let fid = def.getValue(element);
                expect(fid).toBeInstanceOf(FormIdValue);
                expect(fid.file).toBeDefined();
                expect(fid.file.filename).toBe('Skyrim.esm');
                expect(fid.localFormId).toBe(0x654321);
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });

            it('should parse integer value', () => {
                def.setValue(element, new FormIdValue(basicFile, 0x234567));
                expect(element._data).toBe(0x01234567);
            });
        });

        describe('size', () => {
            it('should be 4', () => {
                expect(def.size).toBe(4);
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be formId', () => {
                expect(FormIdDef.defType).toBe('formId');
            });
        });
    });
});
