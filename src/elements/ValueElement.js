const Element = require('./Element');

class ValueElement extends Element {
    constructor(container, def, value) {
        super(container, def);
        if (value !== undefined) this.value = value;
    }

    static load(container, def) {
        let valueElement = new ValueElement(container, def);
        valueElement.readData();
        return valueElement;
    }

    readData() {
        this.memoryMap.setPos(this.offset);
        this._data = this.def.read(this.memoryMap);
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
}

module.exports = ValueElement;
