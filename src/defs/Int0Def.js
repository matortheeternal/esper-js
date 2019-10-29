const IntegerDef = require('./ValueDef');

class Int0Def extends IntegerDef {
    read() {
        return 0;
    }
}

module.exports = Object.assign(Int0Def, {
    defType: 'int0',
    MIN_VALUE: 0,
    MAX_VALUE: 0
});
