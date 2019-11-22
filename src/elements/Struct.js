const Element = require('./Element');
const Container = require('./Container');

class StructElement extends Container {
    static load(container, def) {
        let struct = new Struct(container, def);
        struct.loadElements();
        return struct;
    }

    loadElements() {
        this.def.elementDefs.forEach(elementDef => {
            elementDef.load(this);
        });
    }

    get sorted() {
        return true;
    }
}

module.exports = StructElement;
