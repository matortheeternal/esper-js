const Element = require('./Element');

class Subrecord extends Element {
    subrecordFound() {
        this.element = this.def.elementDef.load(this);
    }
}

module.exports = Subrecord;
