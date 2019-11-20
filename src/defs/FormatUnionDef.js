const FormatDef = require('./FormatDef');
const {ExpectedDefPropertyError} = require('../errors');

class FormatUnionDef extends FormatDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        if (!def.decider) throw new ExpectedDefPropertyError(def, 'decider');
        this.decide = manager.resolveDef(def.decider);
        if (!def.formats) throw new ExpectedDefPropertyError(def, 'formats');
        this.formatDefs = manager.buildDefs(def.formats);
    }

    getFormat(element) {
        let index = this.decide(element) - 1;
        if (index === -1) throw new Error('Could not resolve union.');
        return this.formatDefs[index];
    }

    dataToValue(element, data) {
        let format = this.getFormat(element);
        return format.dataToValue(element, data);
    }

    valueToData(element, value) {
        let format = this.getFormat(element);
        return format.valueToData(element, value);
    }
}

module.exports = Object.assign(FormatUnionDef, {
    defType: 'formatUnion'
});
