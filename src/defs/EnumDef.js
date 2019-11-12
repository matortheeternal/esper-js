const FormatDef = require('./FormatDef');
const InvalidEnumValueError = require('../errors/InvalidEnumValueError');

const unknownExpr = /^<(?:Unknown )?(-?\d+)>$/;

module.exports = Object.assign(EnumDef, {
    defType: 'enum'
});

class EnumDef extends FormatDef {
    dataToValue(element, data) {
        return this.options[data] || this.unknownOption || `<Unknown ${data}>`;
    }

    valueToData(element, value) {
        let opt = Object.keys(this.options).find(key => {
            return this.options[key] === value;
        });
        if (opt !== undefined) return parseInt(opt);
        let match = value.match(unknownExpr);
        if (match) return parseInt(match[1]);
        throw new InvalidEnumValueError(value);
    }
}
