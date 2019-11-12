const FormatDef = require('../FormatDef');

class CTDAParam2StringFormat extends FormatDef {
    dataToValue(element, data) {
        return element.getValue('..\\..\\CIS2');
    }

    valueToData(element, value) {
        element.setValue('..\\..\\CIS2', value);
        return 0;
    }
}

module.exports = CTDAParam2StringFormat;
