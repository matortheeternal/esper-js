const UInt32Def = require('./UInt32Def');
const FormIdValue = require('../FormIdValue');

class FormIdDef extends UInt32Def {
    getValue(element) {
        return FormIdValue.fromElement(element);
    }

    setValue(element, value) {
        this.setData(element, value.toFileFormId(element.file));
    }
}

module.exports = Object.assign(FormIdDef, {
    defType: 'formId'
});
