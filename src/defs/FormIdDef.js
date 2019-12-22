const UInt32Def = require('./UInt32Def');
const FormIdValue = require('../values/FormIdValue');
const {minmax} = require('../helpers');

class FormIdDef extends UInt32Def {
    constructor(manager, def, parent) {
        if (def.format) throw new Error('FormId cannot have format.');
        super(manager, def, parent);
    }

    getValue(element) {
        return element._value;
    }

    setValue(element, value) {
        //element.file.addMaster(value.file);
        element._value = value;
    }

    getData(element) {
        return element._value.toFileFormId(element.file);
    }

    setData(element, data) {
        element._value = FormIdValue.fromFileFormId(
            element.file,
            minmax(
                Math.floor(data),
                this.constructor.MIN_VALUE,
                this.constructor.MAX_VALUE
            )
        );
    }

    getMasterReferences(element, references, trackRefs) {
        if (element._value.isNull()) return;
        if (element._value.file === element.file) return;
        let {filename} = element._value.file;
        trackRefs
            ? references[filename].push(element)
            : references[filename]++;
    }

    referencedRecord(element) {
        return element._value.resolveRecord();
    }
}

module.exports = Object.assign(FormIdDef, {
    defType: 'formId'
});
