const Def = require('./Def');
const MemberArray = require('../elements/MemberArray');
const {ExpectedDefPropertyError} = require('../errors');

class MemberArrayDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.member) throw new ExpectedDefPropertyError(def, 'member');
        this.memberDef = manager.buildDef(def.member, this);
    }

    initElement(record) {
        return new MemberArray(record, this);
    }

    containsSignature(signature) {
        return this.memberDef.signatuture === signature ||
            this.memberDef.containsSignature(signature);
    }

    getOrInitElement(container, signature) {
        if (this.memberDef.hasPrimarySignature(signature))
            return this.memberDef.initElement(container);
        return container.lastElement;
    }

    loadElement(container, signature) {
        if (this.memberDef.isSubrecord)
            return this.memberDef.load(container);
        let element = this.getOrInitElement(container, signature);
        return element.subrecordFound(signature);
    }
}

module.exports = Object.assign(MemberArrayDef, {
    defType: 'memberArray'
});
