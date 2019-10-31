const Record = require('./Record');
const MainRecord = require('./MainRecord');
const GroupRecordHeader = require('./GroupRecordHeader');

class GroupRecord extends Record {
    constructor(container, values) {
        super(container);
        if (values) this.init(values);
    }

    static load(container) {
        let group = new GroupRecord(container);
        group.parseSignature('GRUP');
        group.parseGroupHeader();
        group.parseRecords();
        return group;
    }

    static loadKS(container, signature) {
        let group = new GroupRecord(container);
        group._signature = signature;
        group.parseGroupHeader();
        group.parseRecords();
        return group;
    }

    parseGroupHeader() {
        this._groupHeader = GroupRecordHeader.load(this);
    }

    parseRecords() {
        let startPos = this.memoryMap.getPos(),
            endPos = startPos + this.groupHeader.groupSize;
        while (this.memoryMap.getPos() < endPos) {
            let signature = Signature.parse(this.memoryMap),
                RecordClass = signature.toString() === 'GRUP'
                    ? GroupRecord
                    : MainRecord;
            RecordClass.loadKS(this, signature);
        }
    }

    get groupHeader() {
        return this._groupHeader;
    }

    init(values) {
        this._groupHeader = new GroupRecordHeader(this, values);
    }
}

module.exports = GroupRecord;
