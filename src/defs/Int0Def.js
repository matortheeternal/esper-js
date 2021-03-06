const IntegerDef = require('./IntegerDef');

class Int0Def extends IntegerDef {
    readData() {
        return 0;
    }

    get size() {
        return 0;
    }
}

module.exports = Object.assign(Int0Def, {
    defType: 'int0'
});
