const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');

class UnionDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.elements) throw new ExpectedDefPropertyError(def, 'elements');
        this.elementDefs = manager.buildDefs(def.elements, this);
    }
}

module.exports = Object.assign(UnionDef, {
    defType: 'union'
});
