const ValueDef = require('./ValueDef');

class EmptyDef extends ValueDef {
    setData() {
    }

    readData(stream) {
    }

    getValue() {
        return '';
    }

    setValue(element, value) {
    }

    get size() {
        return 0;
    }
}

module.exports = Object.assign(EmptyDef, {
    defType: 'empty'
});
