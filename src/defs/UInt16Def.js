const IntegerDef = require('./IntegerDef');

class UInt16Def extends IntegerDef {
    read(stream) {
        return stream.read(2).readUInt16LE();
    }

    toBytes(data) {
        let buf = new Buffer(2);
        buf.writeUInt16LE(data);
        return buf;
    }

    get size() {
        return 2;
    }
}

module.exports = Object.assign(UInt16Def, {
    defType: 'uint16',
    ...IntegerDef.getMinAndMaxValues(16, false)
});

