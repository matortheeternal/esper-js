const IntegerDef = require('./IntegerDef');

class Int32Def extends IntegerDef {
    read(stream) {
        return stream.read(4).readInt32LE();
    }
}

module.exports = Object.assign(Int32Def, {
    defType: 'int32',
    ...IntegerDef.getMinAndMaxValues(32)
});
