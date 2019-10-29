const RecordHeader = require('./RecordHeader');

ffp.addDataFormat('MainRecordHeader', [{
    type: 'uint32',
    storageKey: 'dataSize'
}, {
    type: 'uint32',
    storageKey: 'flags'
}, {
    type: 'uint32',
    storageKey: 'id'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'versionControlInfo1'
}, {
    type: 'uint16',
    storageKey: 'version'
}, {
    type: 'buffer',
    size: 2,
    storageKey: 'versionControlInfo2'
}]);

class MainRecordHeader extends RecordHeader {
    constructor(record, values) {
        super(record);
        if (values) this.init(values);
    }

    static load(record) {
        let header = new MainRecordHeader(record);
        header.parse();
        return header;
    }

    parse() {
        ffp.parseSchema(this.memoryMap, 'MainRecordHeader', this);
    }

    init() {
        this.dataSize = 0;
        this.flags = 0;
        this.id = this.file.useNextFormId();
        this.versionControlInfo1 = new Buffer(4);
        this.formVersion = this.file.formVersion;
        this.versionControlInfo2 = new Buffer(2);
    }

    get record() {
        return this.container;
    }
}

module.exports = MainRecordHeader;
