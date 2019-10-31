const {buildDef} = require('../definitionManager');
const SubrecordElement = require('../elements/Subrecord');
const Def = require('./Def');

class SubrecordDef extends Def {
    constructor(def) {
        super(def);
        this.elementDef = buildDef(def.field);
    }

    initElement(container) {
        return new SubrecordElement(container, this);
    }
}

module.exports = Object.assign(SubrecordDef, {
    defType: 'subrecord',
    ElementClass: SubrecordElement
});
