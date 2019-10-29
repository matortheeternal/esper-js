const IntegerDef = require('./IntegerDef');

class Int8Def extends IntegerDef {
    read(stream) {
        return stream.read(1).readInt8();
    }
}

module.exports = Object.assign(Int8Def, {
    defType: 'int8',
    ...IntegerDef.getMinAndMaxValues(8)
});
