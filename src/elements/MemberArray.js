const Container = require('./Container');

class MemberArray extends Container {
    subrecordFound() {
        this.def.memberDef.initElement(this);
    }

    get sorted() {
        return this.def.sorted;
    }
}

module.exports = MemberArray;
