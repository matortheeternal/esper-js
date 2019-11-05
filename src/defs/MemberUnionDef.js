const MembersDef = require('./MembersDef');

class MemberUnionDef extends MembersDef {
    initElement(container) {
        return new MemberUnionElement(container, this);
    }
}

module.exports = Object.assign(MemberUnionDef, {
    defType: 'memberUnion'
});
