const Record = require('./Record');
const Signature = require('../values/Signature');
const StructElement = require('./Struct');

class MainRecord extends Record {
    // TODO: initialize persistent flag for records added to Persistent groups
    constructor(container, signature) {
        super(container);
        if (signature) this.init(signature);
    }

    // We have to parse the signature first because we need to know the
    // def before we can parse the record header.  Technically we could
    // parse the record header in its entirety and then change the
    // format of the flags def field, but it's cleaner this way.
    static load(container, expectedSig) {
        let record = new MainRecord(container);
        record.loadSignature(expectedSig);
        record.loadDef();
        record.loadHeader();
        return record;
    }

    static loadKS(container, signature) {
        let record = new MainRecord(container);
        record._signature = signature;
        record.loadDef();
        record.loadHeader();
        return record;
    }

    loadHeader() {
        this._header = StructElement.load(this, this.def.headerDef);
        this._bodyOffset = this.memoryMap.getPos();
        //this.trackOverrides();
        this.file.recordAdded(this);
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

    loadMembers() {
        this.memoryMap.setPos(this._bodyOffset);
        let endPos = this.nextOffset;
        while (this.memoryMap.getPos() < endPos) {
            let signature = Signature.load(this.memoryMap);
            this.def.loadElement(this, signature);
        }
    }

    init(signature) {
        this.signature = signature;
        this.loadDef();
        this._header = new StructElement(this, this.def.headerDef);
        this.file.recordAdded(this);
        this.def.initElements(this);
    }

    loadDef() {
        let manager = this.file.definitionManager;
        this.def = manager.resolveRecordDef(this.signature);
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
        return this.master;
    }

    get recordHeader() {
        return this._header;
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
        return this._header._elements[1].data;
    }

    get formId() {
        return this._header._elements[3].value;
    }

    get fileFormId() {
        return this._header._elements[3].data;
    }

    get pathName() {
        return this.formId.toFileFormId(this.file).toString(16);
    }
}

module.exports = MainRecord;
