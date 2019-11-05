const MainRecord = require('../elements/MainRecord');
const MembersDef = require('./MembersDef');
const {clone} = require('../helpers');

let buildFlagsDef = function(headerDef, def) {
    if (!def.flags) return;
    headerDef[2].format = def.flags;
};

class MainRecordDef extends MembersDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        let headerDef = clone(manager.resolveDef('MainRecordHeader'));
        buildFlagsDef(headerDef, def);
        this.headerDef = manager.buildDef(headerDef);
    }

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
