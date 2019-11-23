const {ExpectedDefPropertyError} = require('../errors');
const Def = require('./Def');
const UnknownSubrecord = require('../UnknownSubrecord');

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
        if (!memberDef) return new UnknownSubrecord(container, signature);
        if (memberDef.isSubrecord) return memberDef.load(container);
        let element = this.getOrInitElement(container, memberDef);
        return element.subrecordFound(signature);
    }
}

module.exports = MembersDef;
