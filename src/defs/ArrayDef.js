const {buildDef} = require('../definitionManager');
const ArrayElement = require('../elements/ArrayElement');
const Def = require('./Def');

class ArrayDef extends Def {
    constructor(def) {
        super(def);
        this.elementDef = buildDef(this.field);
    }

    initElement(container) {
        return new ArrayElement(container, this);
    }
}

module.exports = Object.assign(ArrayDef, {
    defType: 'array'
});
