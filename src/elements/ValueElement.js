const Element = require('./Element');

class ValueElement extends Element {
    constructor(container, def, value) {
        super(container, def);
        if (value !== undefined) this.value = value;
    }

    static load(container, def) {
        let element = new ValueElement(container, def);
        def.read(element);
        return element;
    }

    readData() {
        this._data = this.def.read(this.file.memoryMap);
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this.def.setData(this, data);
    }

    get value() {
        return this.def.getValue(this);
    }

    set value(value) {
        this.def.setValue(this, value);
    }

    get referencedRecord() {
        if (this.defType !== 'formId') return;
        return this.value.resolveRecord();
    }
}

module.exports = ValueElement;
