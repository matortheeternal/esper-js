const helpers = require('../src/helpers');

describe('helpers', () => {
    describe('minmax', () => {
        it('should return maximum if greater than max', () => {
            let n = helpers.minmax(14, 0, 10);
            expect(n).toBe(10);
        });

        it('should return minimum if less than min', () => {
            let n = helpers.minmax(-4, 0, 10);
            expect(n).toBe(0);
        });

        it('should return number if in range', () => {
            let n = helpers.minmax(5, 0, 10);
            expect(n).toBe(5);
        })
    });

    describe('strToBuffer', () => {
        it('should return buffer with string in it', () => {
            let buf = helpers.strToBuffer('ABC123');
            expect(buf.length).toBe(6);
            expect(buf.toString('ascii')).toBe('ABC123');
        });
    });

    describe('strEquals', () => {
        it('should return true if strings are equal', () => {
            expect(helpers.strEquals('abc', 'abc')).toBe(true);
            expect(helpers.strEquals('ABC', 'abc')).toBe(true);
            expect(helpers.strEquals('aBc', 'AbC')).toBe(true);
        });
    });

    /*describe('readUntil', () => {
        it('should return a buffer up until the specified byte', () => {
            // TODO
        });
    });*/

    describe('expectProperties', () => {
        it('should succeed if properties match', () => {
            helpers.expectProperties({
                a: 'text',
                b: 123,
                c: [0, 1, 2],
                d: {}
            }, {
                a: 'string',
                b: 'number',
                c: 'Array',
                d: 'Object'
            });
        });

        it('should throw an error if properties do not match', () => {
            expect(() => {
                helpers.expectProperties({}, {a: 'string'});
            }).toThrow(/Expected property a to have type string, found type undefined/);
        });
    });

    describe('getFileName', () => {
        it('should return filename', () => {
            let filePath = 'C:\\Test\\file.ext';
            expect(helpers.getFileName(filePath)).toBe('file.ext');
        });
    });

    describe('clone', () => {
        it('should clone objects', () => {
            let obj = {a: 'test'},
                clone = helpers.clone(obj);
            expect(obj).not.toBe(clone);
            expect(obj).toEqual(clone);
        });

        it('should clone arrays', () => {
            let a = [1, 2, 3],
                clone = helpers.clone(a);
            expect(a).not.toBe(clone);
            expect(a).toEqual(clone);
        });

        it('should deep clone objects', () => {
            let obj = {a:{b:{c:1}}},
                clone = helpers.clone(obj);
            expect(obj).not.toBe(clone);
            expect(obj.a).not.toBe(clone.a);
            expect(obj.a.b).not.toBe(clone.a.b);
            expect(obj).toEqual(clone);
        });

        it('should deep clone arrays', () => {
            let a = [{a:1},{b:2,c:['abc']}],
                clone = helpers.clone(a);
            expect(a).not.toBe(clone);
            expect(a[0]).not.toBe(clone[0]);
            expect(a[1]).not.toBe(clone[1]);
            expect(a[1].c).not.toBe(clone[1].c);
            expect(a).toEqual(clone);
        });
    });

    describe('getBits', () => {
        it('should extract bits from a buffer', () => {
            let buf = new Buffer([255, 255]),
                bits = helpers.getBits(buf);
            expect(bits).toBeDefined();
            expect(bits.length).toBe(16);
            expect(bits).toEqual([
                1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1
            ]);
        });
    });

});
