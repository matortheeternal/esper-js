const Def = require('./Def');
const ValueElement = require('../elements/ValueElement');

class ValueDef extends Def {
}

module.exports = Object.assign(ValueDef, {
    ElementClass: ValueElement
});
