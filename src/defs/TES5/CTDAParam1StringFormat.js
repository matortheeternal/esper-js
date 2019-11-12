const FormatDef = require('../FormatDef');

class CTDAParam1StringFormat extends FormatDef {
    dataToValue(element, data) {
        return element.getValue('..\\..\\CIS1');
    }

    valueToData(element, value) {
        element.setValue('..\\..\\CIS1', value);
        return 0;
    }
}

module.exports = CTDAParam1StringFormat;
