const SubrecordElement = require('../elements/Subrecord');
const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');

class SubrecordDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.element) throw new ExpectedDefPropertyError(def, 'element');
        this.elementDef = manager.buildDef(def.element, this);
    }

    initElement(container) {
        return new SubrecordElement(container, this);
    }
}

module.exports = Object.assign(SubrecordDef, {
    defType: 'subrecord',
    ElementClass: SubrecordElement
});
