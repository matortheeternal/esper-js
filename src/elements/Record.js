const Container = require('./Container');
const Signature = require('../Signature');

class Record extends Container {
    parseSignature(expectedSig) {
        this._signature = Signature.parse(this.memoryMap);
        if (expectedSig && this.signature !== expectedSig)
            throw new Error(`Expected signature ${expectedSig}, found ${this.signature}`);
    }

    get signature() {
        return this._signature.toString();
    }

    set signature(signature) {
        this._signature = Signature.fromString(signature);
    }

    get memoryMap() {
        return this.file.memoryMap;
    }
}

module.exports = Record;
