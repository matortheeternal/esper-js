const FormatDef = require('../FormatDef');
const UnknownCTDAFunctionError = require('../../errors/UnknownCTDAFunctionError');
const CTDAFunctions = require('./data/CTDAFunctions');

const unknownFunctionExpr = /^<Unknown (-?\d+)>$/;

class CTDAFunctionFormat extends FormatDef {
    dataToValue(element, data) {
        let option = CTDAFunctions[data];
        return option ? option.name : `<Unknown ${data}>`;
    }

    valueToData(element, value) {
        let key = Object.keys(CTDAFunctions).find(index => {
            return CTDAFunctions[index].name === value;
        });
        if (key !== undefined) return parseInt(key);
        let match = value.match(unknownFunctionExpr);
        if (!match) throw new UnknownCTDAFunctionError(value);
        return parseInt(match[1]);
    }
}

module.exports = CTDAFunctionFormat;
