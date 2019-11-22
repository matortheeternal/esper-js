const Container = require('./Container');
const Signature = require('../Signature');
const {UnexpectedSignatureError} = require('../errors');

class Record extends Container {
    loadSignature(expectedSig) {
        this._signature = Signature.load(this.memoryMap);
        if (expectedSig && this.signature !== expectedSig)
            throw new UnexpectedSignatureError(expectedSig, this.signature);
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
