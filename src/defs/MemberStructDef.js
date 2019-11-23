const MemberStruct = require('../elements/MemberStruct');
const MembersDef = require('./MembersDef');

class MemberStructDef extends MembersDef {
    initElement(container) {
        return new MemberStruct(container, this);
    }

    hasPrimarySignature(signature) {
        let firstMember = this.memberDefs[0];
        return firstMember && firstMember.isSubrecord &&
            firstMember.signature === signature;
    }
}

module.exports = Object.assign(MemberStructDef, {
    defType: 'memberStruct'
});
