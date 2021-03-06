const FormatDef = require('./FormatDef');
const {InvalidEnumValueError} = require('../errors');

const unknownExpr = /^<(?:Unknown )?(-?\d+)>$/;

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

    get options() {
        return this.src.options;
    }
}

module.exports = Object.assign(EnumDef, {
    defType: 'enum'
});
