const {UnimplementedError} = require('../errors');

class Def {
    constructor(manager, def, parent) {
        this.manager = manager; // not necessary?
        this.src = def;
        if (parent) this.parent = parent;
    }

    containsSignature(signature) {
        return false;
    }

    hasPrimarySignature(signature) {
        throw new UnimplementedError();
    }

    get name() {
        return this.src.name;
    }
}

module.exports = Def;
