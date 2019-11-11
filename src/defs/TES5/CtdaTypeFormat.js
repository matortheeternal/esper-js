const Def = require('../Def');

const compareOperators = {
    0x00: 'Equal to',
    0x20: 'Not equal to',
    0x40: 'Greater than',
    0x60: 'Greater than or equal to',
    0x80: 'Less than',
    0xA0: 'Less than or equal to'
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

const unknownCompareOperator = '<Unknown Compare operator>';

class CtdaTypeFormat extends Def {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.enumDef = new EnumDef(manager, ctdaTypeEnum, parent);
        this.flagsDef = new FlagsDef(manager, ctdaTypeFlags, parent);
    }

    getCompareOperator(data) {
        return compareOperators[data & 0xE0] || unknownCompareOperator;
    }

    getFlags(element, data) {
        return this.flagsDef.dataToValue(element, data & 0x1F)
    }

    dataToValue(element, data) {
        let op = this.getCompareOperator(data),
            flags = this.getFlags(element, data);
        return `${op} / ${flags}`;
    }

    valueToData(element, value) {
        // TODO
    }
}

module.exports = CtdaTypeFormat;
