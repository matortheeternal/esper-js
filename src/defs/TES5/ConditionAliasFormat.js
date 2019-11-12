const FormatDef = require('../FormatDef');

class ConditionAliasFormat extends FormatDef {
    dataToValue(element, data) {
        if (data === -1) return 'None';
        return data.toString();
    }

    valueToData(element, value) {
        if (value === 'None') return -1;
        return parseInt(value);
    }
}

module.exports = ConditionAliasFormat;
