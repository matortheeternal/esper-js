const {getRecordDef} = require('../definitionManager');
const Record = require('./Record');
const MainRecordHeader = require('./MainRecordHeader');

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
        this._recordHeader = MainRecordHeader.load(this);
    }

    parseMembers() {
        this.memoryMap.setPos(this.bodyOffset);
        // TODO
    }

    get recordHeader() {
        return this._recordHeader;
    }

    get nextOffset() {
        return this.bodyOffset + this.recordHeader.dataSize;
    }

    init(signature) {
        this.signature = signature;
        this._recordHeader = new MainRecordHeader(this, {});
        this.loadDef();
    }

    loadDef() {
        this.def = getRecordDef(this.signature);
    }
}

module.exports = MainRecord;
