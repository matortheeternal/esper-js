const ArrayElement = require('../elements/ArrayElement');
const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');

class ArrayDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.element) throw new ExpectedDefPropertyError(def, 'element');
        this.elementDef = manager.buildDef(def.element);
    }

    initElement(container) {
        return new ArrayElement(container, this);
    }
}

module.exports = Object.assign(ArrayDef, {
    defType: 'array'
});
