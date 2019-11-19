const {UnknownSignatureError, ExpectedDefPropertyError} = require('../errors');
const Def = require('./Def');

class MembersDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.members) throw new ExpectedDefPropertyError(def, 'members');
        this.memberDefs = manager.buildDefs(def.members, this);
    }

    getMemberDef(signature) {
        return this.memberDefs.find(def => {
            return def.signature === signature ||
                def.containsSignature(signature);
        });
    }

    containsSignature(signature) {
        return Boolean(this.getMemberDef(signature));
    }

    getOrInitElement(container, memberDef) {
        return container._elements[memberDef.sortOrder] ||
            memberDef.initElement(container);
    }

    loadElement(container, signature) {
        let sig = signature.toString(),
            memberDef = this.getMemberDef(sig);
        if (!memberDef) throw new UnknownSignatureError(container, sig);
        let element = this.getOrInitElement(container, memberDef);
        element.subrecordFound(signature);
    }
}

module.exports = MembersDef;
