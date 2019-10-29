const {buildDefs} = require('../definitionManager');
const MainRecord = require('../elements/MainRecord');
const Def = require('./Def');

class MainRecordDef extends Def {
    constructor(def) {
        super(def);
        this.memberDefs = buildDefs(this.members);
    }

    findMemberDef(signature) {
        return this.memberDefs.find(member => {
            return member.signature === signature ||
                member.containsSignature(signature);
        });
    }
}

module.exports = Object.assign(MainRecordDef, {
    defType: 'record',
    ElementClass: MainRecord
});
