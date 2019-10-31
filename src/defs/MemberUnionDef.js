const {buildDefs} = require('../definitionManager');
const Def = require('./Def');

class MemberUnionDef extends Def {
    constructor(def) {
        super(def);
        this.memberDefs = buildDefs(this.members);
    }

    initElement(container) {
        return new MemberUnionElement(container, this);
    }
}

module.exports = Object.assign(MemberUnionDef, {
    defType: 'memberUnion'
});
