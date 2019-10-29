const {buildDefs} = require('../definitionManager');
const MemberStructElement = require('../elements/MemberStructElement')
const Def = require('./Def');

class MemberStructDef extends Def {
    constructor(def) {
        super(def);
        this.memberDefs = buildDefs(this.members);
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
}

module.exports = Object.assign(MemberStructDef, {
    defType: 'memberStruct',
    ElementClass: MemberStructElement
});
