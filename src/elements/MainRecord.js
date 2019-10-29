const {getRecordDef} = require('../definitionManager');
const Record = require('./Record');
const MainRecordHeader = require('./MainRecordHeader');

class MainRecord extends Record {
    // TODO: initialize persistent flag for records added to Persistent groups
    constructor(container, signature) {
        super(container);
        if (signature) this.init(signature);
    }

    static load(container, offset, expectedSig) {
        let record = new MainRecord(container);
        record.offset = offset;
        record.parseSignature(expectedSig);
        record.loadDef();
        record.parseRecordHeader();
        return record;
    }

    parseRecordHeader() {
        this._recordHeader = MainRecordHeader.load(this);
    }

    get recordHeader() {
        return this._recordHeader;
    }

    parseMembers() {

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
