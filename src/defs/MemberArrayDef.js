const {buildDef} = require('../definitionManager');
const Def = require('./Def');
const MemberArray = require('../elements/MemberArray');

class MemberArrayDef extends Def {
    constructor(def) {
        super(def);
        this.memberDef = buildDef(this.member);
    }

    initElement(record) {
        return new MemberArray(record, this);
    }
}

module.exports = Object.assign(MemberArrayDef, {
    defType: 'memberArray'
});
