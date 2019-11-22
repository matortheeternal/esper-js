const Def = require('./Def');
const {ExpectedDefPropertyError} = require('../errors');
const Union = require('../elements/Union');

class UnionDef extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.decider) throw new ExpectedDefPropertyError(def, 'decider');
        //this.decide = manager.resolveDef(def.decider);
        if (!def.elements) throw new ExpectedDefPropertyError(def, 'elements');
        this.elementDefs = manager.buildDefs(def.elements, this);
    }

    getElementDef(element) {
        let index = this.decide(element) - 1;
        if (index === -1) throw new UnionDecideError();
        return this.elementDefs[index];
    }

    load(container) {
        return Union.load(container, this);
    }
}

module.exports = Object.assign(UnionDef, {
    defType: 'union'
});
