const {buildDef} = require('../definitionManager');
const SubrecordElement = require('../elements/SubrecordElement');
const Def = require('./Def');

class SubrecordDef extends Def {
    constructor(def) {
        super(def);
        this.elementDef = buildDef(def.field);
    }
}

module.exports = Object.assign(SubrecordDef, {
    defType: 'subrecord',
    ElementClass: SubrecordElement
});
