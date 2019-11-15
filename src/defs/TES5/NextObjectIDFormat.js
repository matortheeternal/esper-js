const FormatDef = require('../FormatDef');
const {hex} = require('../../helpers');

class NextObjectIDFormat extends FormatDef {
    dataToValue(element, data) {
        return hex(data, 8);
    }

    valueToData(element, value) {
        if (!value) return 2048;
        if (value === '?') return element.file.highObjectId + 1;
        return parseInt(value);
    }
}

module.exports = NextObjectIDFormat;
