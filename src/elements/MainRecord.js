const Record = require('./Record');
const Signature = require('../Signature');
const StructElement = require('./StructElement');

class MainRecord extends Record {
    // TODO: initialize persistent flag for records added to Persistent groups
    constructor(container, signature) {
        super(container);
        if (signature) this.init(signature);
    }

    static load(container, expectedSig) {
        let record = new MainRecord(container);
        record.parseSignature(expectedSig);
        record.loadDef();
        record.parseRecordHeader();
        record.bodyOffset = this.memoryMap.getPos();
        return record;
    }

    static loadKS(container, signature) {
        let record = new MainRecord(container);
        record._signature = signature;
        record.loadDef();
        record.parseRecordHeader();
        record.bodyOffset = this.memoryMap.getPos();
        return record;
    }

    parseRecordHeader() {
        this._recordHeader = StructElement.load(this, this.def.headerDef);
    }

    parseMembers() {
        this.memoryMap.setPos(this.bodyOffset);
        let endPos = this.bodyOffset + this.recordHeader.dataSize;
        while (this.memoryMap.getPos() < endPos) {
            let signature = Signature.parse(this.memoryMap);
            this.def.loadElement(this, signature);
        }
    }

    get recordHeader() {
        return this._recordHeader;
    }

    get nextOffset() {
        return this.bodyOffset + this.recordHeader.dataSize;
    }

    init(signature) {
        this.signature = signature;
        this.loadDef();
        this._recordHeader = new StructElement(this, this.def.headerDef);
        this.def.initElements(this);
    }

    loadDef() {
        let {resolveRecordDef} = this.file.definitionManager;
        this.def = resolveRecordDef(this.signature);
    }

    get sorted() {
        return true;
    }
}

module.exports = MainRecord;
