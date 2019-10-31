const MemberStruct = require('../elements/MemberStruct');
const MembersDef = require('./MembersDef');

class MemberStructDef extends MembersDef {
    initElement(container) {
        return new MemberStruct(container, this);
    }
}

module.exports = Object.assign(MemberStructDef, {
    defType: 'memberStruct'
});
