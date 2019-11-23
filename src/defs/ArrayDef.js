const ElementArray = require('../elements/ElementArray');
const MaybeSubrecordDef = require('./MaybeSubrecordDef');
const {ExpectedDefPropertyError} = require('../errors');

class ArrayDef extends MaybeSubrecordDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.element) throw new ExpectedDefPropertyError(def, 'element');
        this.elementDef = manager.buildDef(def.element);
    }

    load(container) {
        return ElementArray.load(container, this);
    }

    read(element) {
        super.read(element);
        // TODO
    }
}

module.exports = Object.assign(ArrayDef, {
    defType: 'array'
});
