const {strToBuffer} = require('../helpers');
const Record = require('./Record');
const MainRecord = require('./MainRecord');
const StructElement = require('./Struct');

class GroupRecord extends Record {
    constructor(container, values) {
        super(container);
        this.headerDef = this.file.groupHeaderDef;
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
        this._groupHeader = StructElement.load(this, this.headerDef);
    }

    parseRecords() {
        let startPos = this.memoryMap.getPos(),
            endPos = startPos + this.groupHeader.groupSize;
        while (this.memoryMap.getPos() < endPos) {
            let signature = Signature.load(this.memoryMap),
                RecordClass = signature.toString() === 'GRUP'
                    ? GroupRecord
                    : MainRecord;
            RecordClass.loadKS(this, signature);
        }
    }

    get groupHeader() {
        return this._groupHeader;
    }

    init({groupType, label}) {
        this._groupHeader = new StructElement(this, this.headerDef);
        if (groupType) this._groupHeader.setData('Group Type', groupType);
        if (label) this._groupHeader.setData('Label', strToBuffer(label));
    }
}

module.exports = GroupRecord;
