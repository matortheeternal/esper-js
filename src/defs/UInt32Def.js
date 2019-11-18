const IntegerDef = require('./IntegerDef');

class UInt32Def extends IntegerDef {
    read(stream) {
        return stream.read(this.size).readUInt32LE();
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeUInt32LE(data);
        return buf;
    }

    get size() {
        return 4;
    }
}

module.exports = Object.assign(UInt32Def, {
    defType: 'uint32',
    ...IntegerDef.getMinAndMaxValues(32, false)
});
