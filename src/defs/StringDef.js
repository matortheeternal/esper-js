const ValueDef = require('./ValueDef');
const {readUntil} = require('../helpers');
const legacy = require('legacy-encoding');

// TODO: other encoding support
// TODO: translated string support
class StringDef extends ValueDef {
    read(stream) {
        let buf = this.hasOwnProperty('size')
            ? stream.read(this.size)
            : readUntil(stream, 0x00);
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
