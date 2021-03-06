const MaybeSubrecordDef = require('./MaybeSubrecordDef');
const {ExpectedDefPropertyError} = require('../errors');
const Struct = require('../elements/Struct');

class StructDef extends MaybeSubrecordDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.elements) throw new ExpectedDefPropertyError(def, 'elements');
        this.elementDefs = manager.buildDefs(def.elements, this);
    }

    load(container) {
        return Struct.load(container, this);
    }

    read(container) {
        super.read(container);
        this.elementDefs.forEach(elementDef => elementDef.load(container));
    }
}

module.exports = Object.assign(StructDef, {
    defType: 'struct'
});
