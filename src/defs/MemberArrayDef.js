const Def = require('./Def');
const MemberArray = require('../elements/MemberArray');

class MemberArrayDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.memberDef = manager.buildDef(this.member, this);
    }

    initElement(record) {
        return new MemberArray(record, this);
    }
}

module.exports = Object.assign(MemberArrayDef, {
    defType: 'memberArray'
});
