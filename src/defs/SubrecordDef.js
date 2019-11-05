const SubrecordElement = require('../elements/Subrecord');
const Def = require('./Def');

class SubrecordDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
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
