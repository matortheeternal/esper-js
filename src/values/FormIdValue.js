const {MissingMasterError} = require('../errors');

class FormIdValue {
    constructor(file, localFormId) {
        this.file = file;
        this.localFormId = localFormId;
    }

    static getFormIdParts(formId) {
        let buf = new Buffer(4);
        buf.writeUInt32BE(formId);
        let ordinal = buf[0];
        buf[0] = 0;
        let localFormId = buf.readUInt32BE();
        return [ordinal, localFormId];
    };

    static fromFileFormId(file, fileFormId) {
        let [ordinal, localFormId] = FormIdValue.getFormIdParts(fileFormId),
            targetFile = file.ordinalToFile(ordinal);
        return new FormIdValue(targetFile, localFormId);
    }

    static fromElement(element) {
        return FormIdValue.fromFileFormId(element.file, element._data);
    }

    toFileFormId(file) {
        let ordinal = file.fileToOrdinal(this.file);
        if (ordinal === undefined)
            throw new MissingMasterError(file, this.file);
        return ordinal * 0x1000000 + this.localFormId;
    }

    toString() {
        return `{${this.file.filename}:${this.localFormId.toString(16)}}`;
    }

    isNull() {
        return this.localFormId === 0;
    }

    resolveRecord() {
        return this.file.getRecordByFormId(this);
    }
}

module.exports = FormIdValue;
