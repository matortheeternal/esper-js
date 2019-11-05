const ArrayElement = require('../elements/ArrayElement');
const Def = require('./Def');

class ArrayDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.elementDef = manager.buildDef(this.element);
    }

    initElement(container) {
        return new ArrayElement(container, this);
    }
}

module.exports = Object.assign(ArrayDef, {
    defType: 'array'
});
