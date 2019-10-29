const Signature = require('./Signature');

class Record {
    constructor(container) {
        this.container = container;
        this.file = container.file;
    }

    parseSignature(expectedSig) {
        this._signature = Signature.parse(this.memoryMap);
        if (!expectedSig) return;
        if (this.signature !== expectedSig)
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
