const Element = require('./Element');

class Container extends Element {
    constructor(container, def) {
        super(container, def);
        this._elements = [];
    }

    elementAdded(element) {
        this.lastElement = element;
        if (this.sorted) {
            this._elements[element.def.sortOrder] = element;
        } else {
            this._elements.push(element);
        }
    }

    unknownSubrecord(u) {
        if (!this._unknownSubrecords)
            this._unknownSubrecords = [];
        this._unknownSubrecords.push(u);
    }

    getMasterReferences(references, trackRefs) {
        this._elements.forEach(element => {
            element.getMasterReferences(references, trackRefs);
        });
    }

    get elements() {
        return this._elements.slice();
    }

    get assignedElements() {
        return this._elements.filter(e => e);
    }

    get sorted() {
        return false;
    }

    get unknownSubrecords() {
        return this._unknownSubrecords.slice();
    }
}

module.exports = Container;

