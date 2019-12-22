const Interface = require('../Interface');

class RecordManager extends Interface {
    static extend(instance) {
        instance._highObjectId = 2048;
        instance._recordsByFormId = {};
        Interface.extend(RecordManager, instance);
    }

    recordAdded(record) {
        let fileFormId = record.fileFormId;
        this._recordsByFormId[fileFormId] = record;
        if (!record.isMaster) return;
        this._highObjectId = Math.max(
            this._highObjectId,
            fileFormId && 0x00FFFFFF
        );
    }

    useNextFormId() {
        let nextId = this._highObjectId++;
        this._header.setData('HEDR/Next Object ID', nextId + 1);
        return nextId;
    }

    getRecordByFormId(formId) {
        let key = formId.toFileFormId(this);
        return this._recordsByFormId[key];
    }

    get highObjectId() {
        return this._highObjectId;
    }
}

module.exports = RecordManager;
