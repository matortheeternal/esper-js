const FormatDef = require('../FormatDef');
const InvalidValueError = require('../../errors/InvalidValueError');

const valueExpr = /^([\w\s]+)(?:\/ ([\s\w,]+))?$/;

class CtdaTypeFormat extends FormatDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.enumDef = manager.buildDef({id: 'CtdaTypeEnum'}, parent);
        this.flagsDef = manager.buildDef({id: 'CtdaTypeFlags'}, parent);
    }

    getCompareOperator(element, data) {
        return this.enumDef.dataToValue(element, data & 0xE0);
    }

    getFlags(element, data) {
        return this.flagsDef.dataToValue(element, data & 0x1F);
    }

    dataToValue(element, data) {
        let op = this.getCompareOperator(element, data),
            flags = this.getFlags(element, data);
        return flags ? `${op} / ${flags}` : op;
    }

    valueToData(element, value) {
        let match = value.match(valueExpr);
        if (!match) throw new InvalidValueError(this, value);
        let op = match[1].trimRight(),
            opData = this.enumDef.valueToData(element, op),
            flags = match[2] ? match[2].split(', ') : '',
            flagData = this.flagsDef.valueToData(element, flags);
        return opData * Math.pow(2, 5) + flagData;
    }
}

module.exports = CtdaTypeFormat;
