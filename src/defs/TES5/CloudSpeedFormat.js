const FormatDef = require('../FormatDef');

class CloudSpeedFormat extends FormatDef {
    dataToValue(element, data) {
        let float = (data - 127)/1270;
        return float.toFixed(4);
    }

    valueToData(element, value) {
        let float = parseFloat(value);
        return Math.min(Math.round(float * 1270 + 127), 254);
    }
}

module.exports = CloudSpeedFormat;
