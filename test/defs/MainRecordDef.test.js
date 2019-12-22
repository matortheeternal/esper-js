const DefinitionManager = require('../../src/setup/DefinitionManager');
const MainRecordDef = require('../../src/defs/MainRecordDef');
const MembersDef = require('../../src/defs/MembersDef');
const StructDef = require('../../src/defs/StructDef');
const {ExpectedDefPropertyError} = require('../../src/errors');
const {subrecord, string, float, flags} = require('../testHelpers/defHelpers');

const example = {
    type: 'record',
    flags: flags({
        1: 'Test',
        2: 'Ignored'
    }),
    members: [
        subrecord('FULL', string('Name')),
        subrecord('DNAM', float('Armor Rating'))
    ]
};

describe('MainRecordDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(MainRecordDef).toBeDefined();
        });

        it('should extend MembersDef', () => {
            expect(MainRecordDef.prototype).toBeInstanceOf(MembersDef);
        });

        it('should throw an error if member defs are not passed', () => {
            expect(() => {
                new MainRecordDef(manager, {}, null);
            }).toThrow(ExpectedDefPropertyError);
        });

        it('should create a new instance', () => {
            def = new MainRecordDef(manager, example, null);
            expect(def).toBeInstanceOf(MainRecordDef);
        });

        it('should initialize headerDef', () => {
            expect(def.headerDef).toBeDefined();
            expect(def.headerDef).toBeInstanceOf(StructDef);
        });

        it('should use provided record flags', () => {
            let flagsDef = def.headerDef.elementDefs[2],
                formatDef = flagsDef.formatDef;
            expect(formatDef).toBeDefined();
            expect(formatDef.flags).toEqual({
                1: 'Test',
                2: 'Ignored'
            });
        });
    });

    describe('instance methods', () => {
        let def, recordHeader, record;

        beforeAll(() => {
            def = new MainRecordDef(manager, example, null);
            recordHeader = {};
            record = {recordHeader};
        });

        describe('getAdditionalElements', () => {
            it('should be defined', () => {
                expect(def.getAdditionalElements).toBeDefined();
            });

            it('should return an array containing the record header', () => {
                let a = def.getAdditionalElements(record);
                expect(a).toBeDefined();
                expect(a).toBeInstanceOf(Array);
                expect(a.length).toBe(1);
                expect(a[0]).toBe(recordHeader);
            });
        });

        describe('initElements', () => {
            it('should initialize record elements array', () => {
                def.initElements(record);
                expect(record._elements).toBeDefined();
                expect(record._elements).toBeInstanceOf(Array);
                expect(record._elements.length).toBe(3);
                expect(record._elements[0]).toBe(recordHeader);
                expect(record._elements[1]).toBeUndefined();
                expect(record._elements[2]).toBeUndefined();
            });
        });
    });

    describe('static properties', () => {
        describe('defType', () => {
            it('should be "record"', () => {
                expect(MainRecordDef.defType).toBe('record');
            });
        });
    });
});
