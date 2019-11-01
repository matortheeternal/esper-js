class Element {
    constructor(container, def) {
        this.container = container;
        this.file = container.file;
        if (def) this.def = def;
        container.elementAdded(this);
    }

    static load(container, def) {
        let {ElementClass} = def.constructor;
        if (def.hasOwnProperty('inheritFrom')) {
            let value = container[def.inheritFrom];
            return new ElementClass(container, def, value);
        }
        return ElementClass.load(container, def);
    }

    static splitPath(path) {
        let separatorIndex = path.indexOf('\\');
        if (separatorIndex === -1) separatorIndex = path.length;
        return [
            path.slice(0, separatorIndex),
            path.slice(separatorIndex + 1)
        ];
    };

    getElement(path) {
        let [pathPart, remainingPath] = Element.splitPath(path),
            element = this.resolveElement(pathPart);
        return remainingPath.length > 0
            ? element.getElement(pathParts.join('\\'))
            : element;
    }

    getData(path) {
        let element = this.getElement(path);
        if (!element) return;
        return element.data;
    }

    setData(path, data) {
        let element = this.getElement(path);
        if (!element) return;
        element.data = data;
    }
}

module.exports = Element;
