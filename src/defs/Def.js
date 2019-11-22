class Def {
    constructor(manager, def, parent) {
        this.manager = manager; // not necessary?
        this.src = def;
        if (parent) this.parent = parent;
    }

    containsSignature(signature) {
        return false;
    }
}

module.exports = Def;
