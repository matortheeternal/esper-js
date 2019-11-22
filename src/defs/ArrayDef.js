const ElementArray = require('../elements/ElementArray');
const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');

class ArrayDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.element) throw new ExpectedDefPropertyError(def, 'element');
        this.elementDef = manager.buildDef(def.element);
    }

    load(container) {
        return ElementArray.load(container, this);
    }
}

module.exports = Object.assign(ArrayDef, {
    defType: 'array'
});
