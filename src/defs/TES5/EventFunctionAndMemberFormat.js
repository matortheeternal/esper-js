const FormatDef = require('../FormatDef');
const InvalidFormatValueError = require('../../errors/InvalidFormatValueError');

const functionAndMemberExpr = /^([^:]+):([^:]+)$/;

class EventFunctionAndMemberFormat extends FormatDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.fEnumDef = manager.buildDef({id: 'EventFunctionEnum'}, parent);
        this.mEnumDef = manager.buildDef({id: 'EventMemberEnum'}, parent);
    }

    dataToValue(element, data) {
        let eventFunction = data % Math.pow(2, 16),
            eventMember = Math.floor(data / Math.pow(2, 16));
        return [
            this.fEnumDef.dataToValue(element, eventFunction),
            this.mEnumDef.dataToValue(element, eventMember)
        ].join(':');
    }

    valueToData(element, value) {
        let match = value.match(functionAndMemberExpr);
        if (!match) throw new InvalidFormatValueError(this, value);
        return this.fEnumDef.valueToData(match[1]) +
            this.mEnumDef.valueToData(match[2]) * Math.pow(2, 16);
    }
}

module.exports = EventFunctionAndMemberFormat;
