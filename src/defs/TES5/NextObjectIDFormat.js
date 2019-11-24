const FormatDef = require('../FormatDef');

class NextObjectIDFormat extends FormatDef {
    dataToValue(element, data) {
        return data.toString();
    }

    valueToData(element, value) {
        if (!value) return 2048;
        if (value === '?') return element.file.highObjectId + 1;
        return parseInt(value);
    }
}

module.exports = NextObjectIDFormat;
