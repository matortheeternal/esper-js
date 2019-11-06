const IntegerDef = require('./IntegerDef');

class Int32Def extends IntegerDef {
    read(stream) {
        return stream.read(4).readInt32LE();
    }

    toBytes(data) {
        let buf = new Buffer(4);
        buf.writeInt32LE(data);
        return buf;
    }
}

module.exports = Object.assign(Int32Def, {
    defType: 'int32',
    ...IntegerDef.getMinAndMaxValues(32)
});
