const Element = require('./Element');

class Union extends Element {
    static load(container, def) {
        let union = new Union(container, def);
        def.read(union);
        return union;
    }
}

module.exports = Union;
