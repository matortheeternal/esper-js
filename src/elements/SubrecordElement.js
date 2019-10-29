const Element = require('./Element');

class SubrecordElement extends Element {
    static load(container, def) {
        let subrecord = new SubrecordElement(container, def);
        subrecord.loadElement();
        return subrecord;
    }

    loadElement() {
        this.element = Element.load(this, this.def.elementDef);
    }
}

module.exports = SubrecordElement;
