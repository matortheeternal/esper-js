const Record = require('./Record');
const GroupRecordHeader = require('./GroupRecordHeader');

class GroupRecord extends Record {
    constructor(container, values) {
        super(container);
        if (values) this.init(values);
    }

    static load(container, offset) {
        let group = new GroupRecord(container);
        group.offset = offset;
        group.parseSignature('GRUP');
        group.parseGroupHeader();
        return group;
    }

    parseGroupHeader() {
        this._groupHeader = GroupRecordHeader.load(this);
    }

    get groupHeader() {
        return this._groupHeader;
    }

    init(values) {
        this._groupHeader = new GroupRecordHeader(this, values);
    }
}

module.exports = GroupRecord;
