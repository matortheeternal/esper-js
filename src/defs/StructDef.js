const Def = require('./Def');

class StructDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.elementDefs = manager.buildDefs(this.elements, this);
    }
}

module.exports = Object.assign(StructDef, {
    defType: 'struct'
});
