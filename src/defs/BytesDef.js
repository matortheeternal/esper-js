const ValueDef = require('./ValueDef');

class BytesDef extends ValueDef {
    read(stream) {
        return stream.read(this.size);
    }

    setData(element, data) {
        if (!data || data.constructor !== Buffer)
            throw new Error(`Expected a Buffer, found ${data}`);
        if (data.length !== this.size)
            throw new Error(`Expected buffer length ${this.size}, found buffer length ${data.length}.`);
        element._data = data;
    }

    getValue(element) {
        let a = Array.from(element._data).map(v => v.toString(16));
        return a.join(' ').toUpperCase();
    }

    setValue(element, value) {
        let a = value.split(' ').map(v => parseInt(v, 16));
        this.setData(element, new Buffer(a));
    }
}

module.exports = Object.assign(BytesDef, {
    defType: 'bytes'
});
