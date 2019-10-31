const {buildDefs} = require('../definitionManager');
const Def = require('./Def');

class UnionDef extends Def {
    constructor(def) {
        super(def);
        this.elementDefs = buildDefs(this.fields);
    }
}

module.exports = Object.assign(UnionDef, {
    defType: 'union'
});
