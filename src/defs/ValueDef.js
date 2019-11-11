const Def = require('./Def');
const ValueElement = require('../elements/ValueElement');

class ValueDef extends Def {
    write(data, stream) {
        stream.write(this.toBytes(data));
    }
}

module.exports = Object.assign(ValueDef, {
    ElementClass: ValueElement
});
