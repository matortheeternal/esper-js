const Container = require('./Container');

class ElementArray extends Container {
    static load(container, def) {
        let element = new ElementArray(container, def);
        def.read(element);
        return element;
    }
}

module.exports = ElementArray;
