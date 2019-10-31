const MainRecord = require('../elements/MainRecord');
const MembersDef = require('./MembersDef');

class MainRecordDef extends MembersDef {
    getAdditionalElements(record) {
        // TODO: cell, worldspace, etc?
        return [record.recordHeader];
    }

    initElements(record) {
        record._elements = Array.prototype.concat(
            this.getAdditionalElements(record),
            this.memberDefs.map(() => {})
        );
    }
}

module.exports = Object.assign(MainRecordDef, {
    defType: 'record',
    ElementClass: MainRecord
});
