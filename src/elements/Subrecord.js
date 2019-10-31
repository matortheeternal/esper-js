const Element = require('./Element');

class Subrecord extends Element {
    subrecordFound() {
        this.element = Element.load(this, this.def.elementDef);
    }
}

module.exports = Subrecord;
