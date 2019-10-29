const ffp = require('ffp');
const RecordHeader = require('./RecordHeader');

ffp.addDataFormat('GroupRecordHeader', [{
    type: 'uint32',
    storageKey: 'groupSize'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'label'
}, {
    type: 'int32',
    storageKey: 'groupType'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'versionControlInfo'
}, {
    type: 'uint32',
    storageKey: 'unknown'
}]);

class GroupRecordHeader extends RecordHeader {
    constructor(group, values) {
        super(group);
        if (values) this.init(values);
    }

    static load(record) {
        let header = new GroupRecordHeader(record);
        header.parse();
        return header;
    }

    parse() {
        ffp.parseSchema(this.memoryMap, 'GroupRecordHeader', this);
    }

    init({label, groupType}) {
        this.groupSize = 0;
        this.label = new Buffer(4);
        if (label) this.label.write(label, 'ascii');
        this.groupType = groupType || 0;
        this.versionControlInfo = new Buffer(4);
        this.unknown = 0;
    }

    get group() {
        return this.container;
    }
}

module.exports = GroupRecordHeader;
