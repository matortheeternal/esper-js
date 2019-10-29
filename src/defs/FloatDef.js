const ValueDef = require('./ValueDef');

class FloatDef extends ValueDef {
    read(stream) {
        return stream.read(4).readFloatLE();
    }

    setData(element, data) {
        element._data = data;
    }

    getValue(element) {
        // TODO: format?
        return element._data.toFixed(5);
    }

    setValue(element, value) {
        // TODO: format?
        this.setData(element, parseFloat(value));
    }
}

module.exports = Object.assign(FloatDef, {
    defType: 'float'
});
