const DefinitionManager = require('../src/DefinitionManager');
const BytesDef = require('../src/defs/BytesDef');
const ValueDef = require('../src/defs/ValueDef');
const InvalidDefSizeError = require('../src/errors/InvalidDefSizeError');

const bytesDef = {size: 4};

describe('BytesDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        it('should be defined', () => {
            expect(BytesDef).toBeDefined();
        });

        it('should throw an error if the def size is invalid', () => {
            expect(() => {
                new BytesDef(manager, {size: 'a'}, null);
            }).toThrow(InvalidDefSizeError);
        });

        it('should create a new instance', () => {
            let def = new BytesDef(manager, bytesDef, null);
            expect(def).toBeInstanceOf(BytesDef);
        });

        it('should extend ValueDef', () => {
            expect(BytesDef.prototype).toBeInstanceOf(ValueDef);
        });
    });

    describe('instance methods', () => {
        let def;

        beforeAll(() => {
            def = new BytesDef(manager, bytesDef, null);
        });

        describe('read', () => {
            it('should be defined', () => {
                expect(def.read).toBeDefined();
            });
        });

        describe('setData', () => {
            it('should be defined', () => {
                expect(def.setData).toBeDefined();
            });
        });

        describe('getValue', () => {
            it('should be defined', () => {
                expect(def.getValue).toBeDefined();
            });
        });

        describe('setValue', () => {
            it('should be defined', () => {
                expect(def.setValue).toBeDefined();
            });
        });
    });
});
