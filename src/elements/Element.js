class Element {
    constructor(container, def) {
        this.container = container;
        this.file = container.file;
        this.def = def;
    }

    static load(container, def) {
        return new def.constructor.ElementClass(container, def);
    }
}

module.exports = Element;
