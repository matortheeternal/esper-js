const Container = require('./Container');

class MemberArray extends Container {
    subrecordFound(signature) {
        return this.def.loadElement(this, signature);
    }

    get sorted() {
        return this.def.sorted;
    }
}

module.exports = MemberArray;
