const Record = require('./Record');
const Signature = require('../Signature');
const StructElement = require('./Struct');

class MainRecord extends Record {
    // TODO: initialize persistent flag for records added to Persistent groups
    constructor(container, signature) {
        super(container);
        this.file.recordAdded(this);
        if (signature) this.init(signature);
    }

    static load(container, expectedSig) {
        let record = new MainRecord(container);
        record.parseSignature(expectedSig);
        record.loadDef();
        record.parseRecordHeader();
        record._bodyOffset = this.memoryMap.getPos();
        return record;
    }

    static loadKS(container, signature) {
        let record = new MainRecord(container);
        record._signature = signature;
        record.loadDef();
        record.parseRecordHeader();
        record._bodyOffset = this.memoryMap.getPos();
        return record;
    }

    parseRecordHeader() {
        this._recordHeader = StructElement.load(this, this.def.headerDef);
        this.trackOverrides();
    }

    trackOverrides() {
        let formId = this.formId;
        if (formId.file === this.file) {
            this._overrides = [];
            return;
        }
        this._master = formId.resolveRecord();
        this._master.addOverride(this);
    };

    parseMembers() {
        this.memoryMap.setPos(this._bodyOffset);
        let endPos = this._bodyOffset + this.recordHeader.dataSize;
        while (this.memoryMap.getPos() < endPos) {
            let signature = Signature.parse(this.memoryMap);
            this.def.loadElement(this, signature);
        }
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

    addOverride(rec) {
        this._overrides.push(rec);
    }

    knownOverride(file) {
        let overrides = this.overrides;
        for (let i = overrides.length - 1; i >= 0; i--) {
            let ovr = overrides[i];
            if (ovr.file === file || file._masters.includes(ovr.file))
                return ovr;
        }
        return this;
    }

    get recordHeader() {
        return this._recordHeader;
    }

    get nextOffset() {
        return this._bodyOffset + this.dataSize;
    }

    get isMaster() {
        return !this._master;
    }

    get master() {
        return this._master || this;
    }

    get overrides() {
        return this.isMaster
            ? this._overrides.slice()
            : this.master.overrides;
    }

    get sorted() {
        return true;
    }

    get winningOverride() {
        let overrides = this.overrides,
            len = overrides.length;
        return len ? overrides[len - 1] : this;
    }

    get dataSize() {
        return this._recordHeader._elements[0].data;
    }

    get formId() {
        return this._recordHeader._elements[3].value;
    }
}

module.exports = MainRecord;
