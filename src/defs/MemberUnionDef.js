const MembersDef = require('./MembersDef');
const MemberUnion = require('../elements/MemberUnion');

class MemberUnionDef extends MembersDef {
    initElement(container) {
        return new MemberUnion(container, this);
    }
}

module.exports = Object.assign(MemberUnionDef, {
    defType: 'memberUnion'
});
