const FormatDef = require('./FormatDef');
const {ExpectedDefPropertyError, UnionDecideError} = require('../errors');

class FormatUnionDef extends FormatDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.decider) throw new ExpectedDefPropertyError(def, 'decider');
        //this.decide = manager.resolveDef(def.decider);
        if (!def.formats) throw new ExpectedDefPropertyError(def, 'formats');
        this.formatDefs = manager.buildDefs(def.formats, parent);
    }

    getFormatDef(element) {
        let index = this.decide(element) - 1;
        if (index === -1) throw new UnionDecideError();
        return this.formatDefs[index];
    }

    dataToValue(element, data) {
        let format = this.getFormatDef(element);
        return format.dataToValue(element, data);
    }

    valueToData(element, value) {
        let format = this.getFormatDef(element);
        return format.valueToData(element, value);
    }
}

module.exports = Object.assign(FormatUnionDef, {
    defType: 'formatUnion'
});
