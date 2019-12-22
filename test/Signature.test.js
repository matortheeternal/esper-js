const Signature = require('../src/values/Signature');

describe('Signature', () => {
    describe('constructor', () => {
        let signature;

        it('should be defined', () => {
            expect(Signature).toBeDefined();
        });

        it('should make a new instance of the class', () => {
            let buf = new Buffer('ACHR', 'ascii');
            signature = new Signature(buf);
            expect(signature).toBeDefined();
            expect(signature).toBeInstanceOf(Signature);
        });

        it('should set _data', () => {
            expect(signature._data).toBeDefined();
            expect(signature._data).toBeInstanceOf(Buffer);
        });
    });

    describe('class methods', () => {
        describe('parse', () => {
            it('should return a new Signature', () => {
                let buf = new Buffer('ACHR', 'ascii');
                let signature = Signature.load({
                    read: () => buf
                });
                expect(signature).toBeDefined();
                expect(signature).toBeInstanceOf(Signature);
                expect(signature._data).toBe(buf);
            });
        });

        describe('fromString', () => {
            it('should return a new signature', () => {
                let signature = Signature.fromString('ACHR');
                expect(signature).toBeDefined();
                expect(signature).toBeInstanceOf(Signature);
                expect(signature._data).toBeInstanceOf(Buffer);
            });

            it('should map special characters', () => {
                let signature = Signature.fromString('abcd');
                expect(signature._data[0]).toBe(0x0);
                expect(signature._data[1]).toBe(0x1);
                expect(signature._data[2]).toBe(0x2);
                expect(signature._data[3]).toBe(0x3);
            });
        });
    });

    describe('instance methods', () => {
        describe('toString', () => {
            it('should return the string value', () => {
                let buf = new Buffer('ACHR', 'ascii'),
                    signature = new Signature(buf);
                expect(signature.toString()).toBe('ACHR');
            });

            it('should map special characters', () => {
                let buf = new Buffer([0x0, 0x1, 0x2, 0x3]),
                    signature = new Signature(buf);
                expect(signature.toString()).toBe('abcd');
            });
        });
    });
});
