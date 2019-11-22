const Container = require('./Container');

class Struct extends Container {
    static load(container, def) {
        let struct = new Struct(container, def);
        def.elementDefs.forEach(elementDef => elementDef.load(struct));
        return struct;
    }

    get sorted() {
        return true;
    }
}

module.exports = Struct;
