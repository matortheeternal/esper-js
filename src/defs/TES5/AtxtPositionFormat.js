const FormatDef = require('../FormatDef');

class AtxtPositionFormat extends FormatDef {
    dataToValue(element, data) {
        return `${data} -> ${Math.floor(data / 17)} -> ${data % 17}`
    }

    valueToData(element, value) {
        return parseInt(value);
    }
}

module.exports = AtxtPositionFormat;
