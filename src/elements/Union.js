const Element = require('./Element');

class Union extends Element {
    static load(container, def) {
        let union = new Union(container, def);
        union.loadElement();
        return union;
    }

    loadElement() {
        let elementDef = this.def.getElementDef(this);
        this.element = elementDef.load(this.container);
    }
}

module.exports = Union;
