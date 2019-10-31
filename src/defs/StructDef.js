const {buildDefs} = require('../definitionManager');
const Def = require('./Def');

class StructDef extends Def {
    constructor(def) {
        super(def);
        this.elementDefs = buildDefs(this.fields);
    }
}

module.exports = Object.assign(StructDef, {
    defType: 'struct'
});
