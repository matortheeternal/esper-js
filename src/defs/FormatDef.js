const Def = require('./Def');

class FormatDef extends Def {
    dataToValue(element, data) {
        return `${data}`;
    }

    valueToData(element, value) {
        return parseInt(value);
    }
}

module.exports = FormatDef;
