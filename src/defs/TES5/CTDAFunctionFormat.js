const FormatDef = require('../FormatDef');
const UnknownCTDAFunctionError = require('../../errors/UnknownCTDAFunctionError');
const CTDAFunctions = require('./data/CTDAFunctions');

class CTDAFunctionFormat extends FormatDef {
    dataToValue(element, data) {
        let option = CTDAFunctions[data];
        return option ? option.name : `<Unknown ${data}>`;
    }

    valueToData(element, value) {
        let data = Object.keys(CTDAFunctions).find(index => {
            return CTDAFunctions[index].name === value;
        });
        if (data === undefined) throw new UnknownCTDAFunctionError(value);
        return parseInt(data);
    }
}

module.exports = CTDAFunctionFormat;
