const ValueDef = require('./ValueDef');
const {minmax} = require('../helpers');

class IntegerDef extends ValueDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.format) return;
        this.formatDef = manager.buildDef(def.format);
    }

    static getMinAndMaxValues(bits, signed = true) {
        return {
            MIN_VALUE: signed
                ? 0 - Math.pow(2, bits - 1)
                : 0,
            MAX_VALUE: signed
                ? Math.pow(2, bits - 1) - 1
                : Math.pow(2, bits) - 1
        }
    }

    setData(element, data) {
        element._data = minmax(
            Math.floor(data),
            this.constructor.MIN_VALUE,
            this.constructor.MAX_VALUE
        );
    }

    getValue(element) {
        return this.formatDef
            ? this.formatDef.dataToValue(element, element._data)
            : element._data.toString();
    }

    setValue(element, value) {
        let data = this.formatDef
            ? this.formatDef.valueToData(element, value)
            : parseInt(value);
        this.setData(element, data);
    }
}

module.exports = Object.assign(IntegerDef, {
    MIN_VALUE: -Infinity,
    MAX_VALUE: Infinity
});
