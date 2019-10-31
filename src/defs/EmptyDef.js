const ValueDef = require('./ValueDef');

class EmptyDef extends ValueDef {
    setData() {
    }

    read(stream) {
    }

    getValue() {
        return '';
    }

    setValue(element, value) {
    }
}

module.exports = Object.assign(EmptyDef, {
    defType: 'empty'
});
