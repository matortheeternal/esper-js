const IntegerDef = require('./IntegerDef');

class UInt16Def extends IntegerDef {
    read(stream) {
        return stream.read(2).readUInt16LE();
    }
}

module.exports = Object.assign(UInt16Def, {
    defType: 'uint16',
    ...IntegerDef.getMinAndMaxValues(16, false)
});

