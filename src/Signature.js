const {getCharCode, getCharacter} = require('./signatureChars');

class Signature {
    constructor(data) {
        this._data = data;
    }

    static load(memoryMap) {
        let data = memoryMap.read(4);
        return new Signature(data);
    }

    static fromString(str) {
        let data = new Buffer(4);
        str.split('').forEach((char, n) => {
            data[n] = getCharCode(char);
        });
        return new Signature(data);
    }

    toString() {
        return Array.from(this._data).map(n => {
            return getCharacter(n);
        }).join('');
    }
}

module.exports = Signature;
