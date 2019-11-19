const FormatDef = require('../FormatDef');

class CloudSpeedFormat extends FormatDef {
    dataToValue(element, data) {
        let float = (data - 127)/1270;
        return float.toFixed(4);
    }

    valueToData(element, value) {
        let float = parseFloat(value);
        // I don't understand why the maximum value here is 254
        // I need to look into this at some point.  I feel like it
        // should have 254 as the minimum value, not the max, but
        // what do I know?
        return Math.min(Math.round(float * 1270 + 127), 254);
    }
}

module.exports = CloudSpeedFormat;
