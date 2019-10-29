const Element = require('./Element');

class StructElement extends Element {
    static load(container, def) {
        let struct = new StructElement(container, def);
        struct.loadElements();
        return struct;
    }

    loadElements() {
        this.elements = this.def.elementDefs.map(elementDef => {
            return Element.load(this, elementDef);
        });
    }
}

module.exports = StructElement;
