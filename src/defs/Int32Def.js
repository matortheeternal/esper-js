const IntegerDef = require('./IntegerDef');

class Int32Def extends IntegerDef {
    read(stream) {
        return stream.read(this.size).readInt32LE();
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeInt32LE(data);
        return buf;
    }

    get size() {
        return 4;
    }
}

module.exports = Object.assign(Int32Def, {
    defType: 'int32',
    ...IntegerDef.getMinAndMaxValues(32)
});
