const Def = require('./Def');

class UnionDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.elementDefs = manager.buildDefs(this.elements, this);
    }
}

module.exports = Object.assign(UnionDef, {
    defType: 'union'
});
