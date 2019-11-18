const IntegerDef = require('./IntegerDef');

class UInt8Def extends IntegerDef {
    read(stream) {
        return stream.read(this.size).readUInt8();
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeUInt8(data);
        return buf;
    }

    get size() {
        return 1;
    }
}

module.exports = Object.assign(UInt8Def, {
    defType: 'uint8',
    ...IntegerDef.getMinAndMaxValues(8, false)
});
