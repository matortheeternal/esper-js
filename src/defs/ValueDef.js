const Def = require('./Def');
const ValueElement = require('../elements/ValueElement');
const {UnimplementedError} = require('../errors');

class ValueDef extends Def {
    write(data, stream) {
        stream.write(this.toBytes(data));
    }

    toBytes(data) {
        throw new UnimplementedError();
    }

    load(container) {
        if (this.src.hasOwnProperty('inheritFrom')) {
            let value = container[this.src.inheritFrom];
            return new ValueElement(container, this, value);
        }
        return ValueElement.load(container, this);
    }
}

module.exports = Object.assign(ValueDef);
