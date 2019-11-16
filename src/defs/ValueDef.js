const Def = require('./Def');
const ValueElement = require('../elements/ValueElement');
const UnimplementedError = require('../errors/UnimplementedError');

class ValueDef extends Def {
    write(data, stream) {
        stream.write(this.toBytes(data));
    }

    toBytes(data) {
        throw new UnimplementedError();
    }
}

module.exports = Object.assign(ValueDef, {
    ElementClass: ValueElement
});
