class Def {
    constructor(def) {
        Object.assign(this, def);
    }

    containsSignature(signature) {
        return false;
    }
}

module.exports = Def;
