const DefinitionManager = require('../src/DefinitionManager');
const ValueDef = require('../src/defs/ValueDef');
const Def = require('../src/defs/Def');
const UnimplementedError = require('../src/errors/UnimplementedError');

describe('ValueDef', () => {
    let manager;

    beforeAll(() => {
        manager = new DefinitionManager('TES5');
    });

    describe('constructor', () => {
        let def;

        it('should be defined', () => {
            expect(ValueDef).toBeDefined();
        });

        it('should create a new instance', () => {
            def = new ValueDef(manager, {}, null);
            expect(def).toBeInstanceOf(ValueDef);
        });

        it('should extend def', () => {
            expect(ValueDef.prototype).toBeInstanceOf(Def);
        });
    });

    describe('instance methods', () => {
        describe('toBytes', () => {
            let def;

            beforeAll(() => {
                def = new ValueDef(manager, {}, null);
            });

            it('should be defined', () => {
                expect(def.toBytes).toBeDefined();
            });

            it('should throw an unimplemented error', () => {
                expect(() => {
                    def.toBytes();
                }).toThrow(UnimplementedError)
            });
        });

        describe('write', () => {
            let stream, buf, def;

            beforeAll(() => {
                stream = {write: jest.fn()};
                buf = new Buffer(1);
                class ExampleValueDef extends ValueDef {}
                ExampleValueDef.prototype.toBytes = jest.fn(() => {
                    return buf;
                });
                def = new ExampleValueDef(manager, {}, null);
            });

            it('should be defined', () => {
                expect(def.write).toBeDefined();
            });

            it('should call toBytes with data', () => {
                def.write(0, stream);
                expect(def.toBytes).toHaveBeenCalledWith(0);
            });

            it('should call stream.write', () => {
                expect(stream.write).toHaveBeenCalledWith(buf);
            });
        });
    });
});
