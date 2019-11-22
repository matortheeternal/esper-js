const ValueDef = require('./ValueDef');
const legacy = require('legacy-encoding');

const nullTerminator = new Buffer([0x00]);

// TODO: other encoding support
// TODO: translated string support
class StringDef extends ValueDef {
    read(stream) {
        let buf = this.src.hasOwnProperty('size')
            ? stream.read(this.src.size)
            : stream.readUntil(nullTerminator);
        return legacy.decode(buf, 'cp1252');
    }

    setData(element, data) {
        element._data = data;
    }

    getValue(element) {
        return element._data;
    }

    setValue(element, value) {
        this.setData(element, value);
    }
}

module.exports = Object.assign(StringDef, {
    defType: 'string'
});
