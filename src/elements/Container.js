const UnsupportedElementError = require('../errors/UnsupportedElementError');
const InvalidPathError = require('../errors/InvalidPathError');
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

    get assignedElements() {
        return this._elements.filter(e => e);
    }

    get sorted() {
        return false;
    }

    resolveElement(pathPart) {
        let strategies = Container.resolutionStrategies;
        for (let strategy of strategies) {
            let match = strategy.match(pathPart);
            if (match) return strategy.resolve(this, match);
        }
    }

    getElement(path) {
        let [pathPart, remainingPath] = Element.splitPath(path),
            element = this.resolveElement(pathPart);
        return remainingPath.length > 0
            ? element.getElement(remainingPath)
            : element;
    }

    getData(path) {
        let element = this.getElement(path);
        if (!element) return;
        return element.data;
    }

    setData(path, data) {
        let element = this.getElement(path);
        if (!element) throw new InvalidPathError(this, path);
        if (!element.hasOwnProperty('data'))
            throw new UnsupportedElementError(element, 'setData');
        element.data = data;
    }
}

module.exports = Object.assign(Container, {
    resolutionStrategies: []
});
