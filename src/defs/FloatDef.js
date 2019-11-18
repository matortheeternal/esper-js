const ValueDef = require('./ValueDef');

class FloatDef extends ValueDef {
    read(stream) {
        return stream.read(this.size).readFloatLE();
    }

    setData(element, data) {
        element._data = data;
    }

    getValue(element) {
        return element._data.toFixed(5);
    }

    setValue(element, value) {
        this.setData(element, parseFloat(value));
    }

    get size() {
        return 4;
    }
}

module.exports = Object.assign(FloatDef, {
    defType: 'float'
});
