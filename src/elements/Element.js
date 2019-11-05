class Element {
    constructor(container, def) {
        if (def) this.def = def;
        if (!container) return;
        this.container = container;
        this.file = container.file;
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

    get name() {
        return this.def.name;
    }

    get displayName() {
        return this.def.name;
    }

    get path() {
        if (!this.container) return this.pathName;
        return `${this.container.path}\\${this.pathName}`;
    }
}

module.exports = Element;
