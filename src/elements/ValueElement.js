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

    getMasterReferences(references, trackRefs) {
        this.def.getMasterReferences(this, references, trackRefs);
    }

    get data() {
        return this.def.getData(this);
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
        return this.def.referencedRecord(this);
    }
}

module.exports = ValueElement;
