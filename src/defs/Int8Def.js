const IntegerDef = require('./IntegerDef');

class Int8Def extends IntegerDef {
    read(stream) {
        return stream.read(this.size).readInt8();
    }

    toBytes(data) {
        let buf = new Buffer(this.size);
        buf.writeInt8(data);
        return buf;
    }

    get size() {
        return 1;
    }
}

module.exports = Object.assign(Int8Def, {
    defType: 'int8',
    ...IntegerDef.getMinAndMaxValues(8)
});
