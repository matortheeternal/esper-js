const Def = require('../Def');

const ctdaTypeEnum = {
    options: {
        0x00: 'Equal to',
        0x20: 'Not equal to',
        0x40: 'Greater than',
        0x60: 'Greater than or equal to',
        0x80: 'Less than',
        0xA0: 'Less than or equal to'
    },
    unknownOption: '<Unknown Compare operator>'
};

const ctdaTypeFlags = {
    flags: {
        0x01: 'Or',
        0x02: 'Use aliases',
        0x04: 'Use global',
        0x08: 'Use packdata',
        0x10: 'Swap Subject and Target'
    }
};

const valueExpr = /^([\w\s]+)(?:\/ ([\s\w,]+))?$/;

class CtdaTypeFormat extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.enumDef = new EnumDef(manager, ctdaTypeEnum, parent);
        this.flagsDef = new FlagsDef(manager, ctdaTypeFlags, parent);
    }

    getCompareOperator(element, data) {
        return this.enumDef.dataToValue(element, data & 0xE0);
    }

    getFlags(element, data) {
        return this.flagsDef.dataToValue(element, data & 0x1F)
    }

    dataToValue(element, data) {
        let op = this.getCompareOperator(element, data),
            flags = this.getFlags(element, data);
        return flags ? `${op} / ${flags}` : op;
    }

    valueToData(element, value) {
        let match = value.match(valueExpr);
        if (!match) throw new Error('Invalid CTDA type value: ' + value);
        let op = match[1].trimRight(),
            opData = this.enumDef.valueToData(element, op),
            flags = match[2] ? match[2].split(', ') : '',
            flagData = this.flagsDef.valueToData(element, flags);
        return opData * Math.pow(2, 5) + flagData;
    }
}

module.exports = CtdaTypeFormat;
