const Def = require('./Def');
const Signature = require('../values/Signature');
const {readSize} = require('../helpers');

class MaybeSubrecordDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.signature) return;
        this._signature = Signature.fromDefString(def.signature);
    }

    get isSubrecord() {
        return this.src.hasOwnProperty('signature');
    }

    get signature() {
        return this.src.signature;
    }

    get name() {
        return this.isSubrecord
            ? `${this.src.signature} - ${this.src.name}`
            : this.src.name;
    }

    read(element) {
        if (!this.isSubrecord) return;
        element._size = readSize(element.file.memoryMap);
    }

    write(stream) {
        if (!this.isSubrecord) return;
        this._signature.write(stream);
    }
}

module.exports = MaybeSubrecordDef;
