// TODO: special character mappings
class Signature {
    constructor(data) {
        this._data = data;
    }

    static parse(memoryMap, offset) {
        memoryMap.goto(offset);
        let data = memoryMap.read(4);
        return new Signature(data);
    }

    static fromString(str) {
        let data = new Buffer(4);
        data.write(str, 'ascii');
        return new Signature(data);
    }

    toString() {
        return this._data.toString('ascii');
    }
}

module.exports = Signature;
