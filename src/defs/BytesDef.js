const ValueDef = require('./ValueDef');
const {InvalidDefSizeError, InvalidValueError} = require('../errors');
const {isPositiveInteger} = require('../helpers');

const bytesExpr = /^([0-9a-f]{2} )*([0-9a-f]{2})$/i;

class BytesDef extends ValueDef {
    constructor(manager, def, parent) {
        if (def.size === undefined) def.size = 0;
        if (!isPositiveInteger(def.size))
            throw new InvalidDefSizeError(def);
        super(manager, def, parent);
    }

    readData(stream) {
        return stream.read(this.src.size);
    }

    setData(element, data) {
        if (!data || data.constructor !== Buffer)
            throw new Error(`Expected a Buffer, found ${data}`);
        if (data.length !== this.src.size)
            throw new Error(`Expected buffer length ${this.src.size}, found buffer length ${data.length}.`);
        element._data = data;
    }

    getValue(element) {
        if (element._data.length === 0) return '';
        let a = Array.from(element._data).map(v => v.toString(16));
        return a.join(' ').toUpperCase();
    }

    setValue(element, value) {
        let match = value.match(bytesExpr);
        if (!match) throw new InvalidValueError(this, value);
        let a = value.split(' ').map(v => parseInt(v, 16));
        this.setData(element, new Buffer(a));
    }
}

module.exports = Object.assign(BytesDef, {
    defType: 'bytes'
});
