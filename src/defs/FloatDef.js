const ValueDef = require('./ValueDef');

class FloatDef extends ValueDef {
    read(stream) {
        return stream.read(this.size).readFloatLE();
    }

    setData(element, data) {
        if (typeof data !== 'number')
            throw new Error(`Expected a number, found: ${typeof data}`);
        element._data = data;
    }

    getValue(element) {
        return element._data.toFixed(5);
    }

    setValue(element, value) {
        this.setData(element, parseFloat(value));
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeFloatLE(data);
        return buf;
    }

    get size() {
        return 4;
    }
}

module.exports = Object.assign(FloatDef, {
    defType: 'float'
});
