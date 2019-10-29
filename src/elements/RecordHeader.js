class RecordHeader {
    constructor(record) {
        this.file = record.file;
        this.container = record;
    }

    get memoryMap() {
        return this.file.memoryMap;
    }

    get offset() {
        return this.container.offset + 4;
    }
}

module.exports = RecordHeader;
