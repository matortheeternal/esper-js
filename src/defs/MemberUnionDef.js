const MembersDef = require('./MembersDef');
const MemberUnion = require('../elements/MemberUnion');

class MemberUnionDef extends MembersDef {
    initElement(container) {
        return new MemberUnion(container, this);
    }

    hasPrimarySignature(signature) {
        return this.memberDefs.any(def => {
            return def.signature === signature;
        });
    }
}

module.exports = Object.assign(MemberUnionDef, {
    defType: 'memberUnion'
});
