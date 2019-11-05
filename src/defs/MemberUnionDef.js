const Def = require('./Def');

class MemberUnionDef extends Def {
    constructor(manager, def, parent) {
        super(def, parent);
        //this.memberDefs = manager.buildDefs(this.members, this);
    }

    initElement(container) {
        return new MemberUnionElement(container, this);
    }
}

module.exports = Object.assign(MemberUnionDef, {
    defType: 'memberUnion'
});
