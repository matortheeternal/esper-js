const IntegerDef = require('./IntegerDef');

class UInt8Def extends IntegerDef {
    read(stream) {
        return stream.read(1).readUInt8();
    }
}

module.exports = Object.assign(UInt8Def, {
    defType: 'uint8',
    ...IntegerDef.getMinAndMaxValues(8, false)
});
