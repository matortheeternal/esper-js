class RecordHeader {
    constructor(record) {
        this.file = record.file;
        this.container = record;
    }

    get memoryMap() {
        return this.file.memoryMap;
    }
}

module.exports = RecordHeader;
