const Container = require('./Container');

class ElementArray extends Container {
    static load(container, def) {
        let a = new ElementArray(container, def);
        a.loadElements();
        return a;
    }

    loadElements() {
        // TODO
    }
}

module.exports = ElementArray;
