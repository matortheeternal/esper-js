const FormatDef = require('../FormatDef');

class HideFFFF_Format extends FormatDef {
    dataToValue(element, data) {
        if (data === 0xFFFF) return 'None';
        return data.toString();
    }

    valueToData(element, value) {
        if (value === 'None') return 0xFFFF;
        return parseInt(value);
    }
}

module.exports = HideFFFF_Format;
