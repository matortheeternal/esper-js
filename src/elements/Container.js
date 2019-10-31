const Element = require('./Element');

class Container extends Element {
    constructor(container, def) {
        super(container, def);
        this._elements = [];
    }

    elementAdded(element) {
        if (this.sorted) {
            this._elements[element.def.sortOrder] = element;
        } else {
            this._elements.push(element);
        }
    }

    get elements() {
        return this._elements.slice();
    }

    get sorted() {
        return false;
    }
}

module.exports = Container;
