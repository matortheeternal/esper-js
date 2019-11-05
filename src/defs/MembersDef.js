const UnknownSignatureError = require('../errors/UnknownSignatureError');
const ExpectedDefMembersError = require('../errors/ExpectedDefMembersError');
const Def = require('./Def');

class MembersDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.members) throw new ExpectedDefMembersError(def);
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

    findMemberDef(signature) {
        return this.memberDefs.find(member => {
            return member.signature === signature ||
                member.containsSignature(signature);
        });
    }

    getOrInitElement(container, memberDef) {
        return container._elements[memberDef.sortOrder] ||
            memberDef.initElement(container);
    }

    loadElement(container, signature) {
        let sig = signature.toString(),
            memberDef = this.findMemberDef(sig);
        if (!memberDef) throw new UnknownSignatureError(container, sig);
        let element = this.getOrInitElement(container, memberDef);
        element.subrecordFound(signature);
    }
}

module.exports = MembersDef;
