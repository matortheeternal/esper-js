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
}

module.exports = Object.assign(MemberArrayDef, {
    defType: 'memberArray'
});
