const IntegerDef = require('./IntegerDef');

class Int16Def extends IntegerDef {
    read(stream) {
        return stream.read(2).readInt16LE();
    }
}

module.exports = Object.assign(Int16Def, {
    defType: 'int16',
    ...IntegerDef.getMinAndMaxValues(16)
});
