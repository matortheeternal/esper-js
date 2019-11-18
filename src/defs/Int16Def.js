const IntegerDef = require('./IntegerDef');

class Int16Def extends IntegerDef {
    read(stream) {
        return stream.read(this.size).readInt16LE();
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeInt16LE(data);
        return buf;
    }

    get size() {
        return 2;
    }
}

module.exports = Object.assign(Int16Def, {
    defType: 'int16',
    ...IntegerDef.getMinAndMaxValues(16)
});
