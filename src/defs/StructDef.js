const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');
const Struct = require('../elements/Struct');

class StructDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.elements) throw new ExpectedDefPropertyError(def, 'elements');
        this.elementDefs = manager.buildDefs(def.elements, this);
    }

    load(container) {
        return Struct.load(container, this);
    }
}

module.exports = Object.assign(StructDef, {
    defType: 'struct'
});
