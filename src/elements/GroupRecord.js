const {strToBuffer} = require('../helpers');
const Record = require('./Record');
const MainRecord = require('./MainRecord');
const Signature = require('../values/Signature');
const StructElement = require('./Struct');

const GROUP_HEADER_SIZE = 24; // TODO: calculate this

class GroupRecord extends Record {
    constructor(container, values) {
        super(container);
        this.headerDef = this.file.groupHeaderDef;
        if (values) this.init(values);
    }

    static load(container) {
        let group = new GroupRecord(container);
        group.loadSignature('GRUP');
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
        this._recordsOffset = this.memoryMap.getPos();
    }

    parseRecords() {
        let endPos = this.nextOffset;
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

    get nextOffset() {
        return this._recordsOffset + this.groupSize - GROUP_HEADER_SIZE;
    }

    get groupSize() {
        return this._groupHeader.getData('Group Size');
    }

    get label() {
        return this._groupHeader.getData('Label');
    }

    init({groupType, label}) {
        this._groupHeader = new StructElement(this, this.headerDef);
        if (groupType) this._groupHeader.setData('Group Type', groupType);
        if (label) this._groupHeader.setData('Label', strToBuffer(label));
    }
}

module.exports = GroupRecord;
