const Container = require('./Container');

class MemberStruct extends Container {
    subrecordFound(signature) {
        this.def.loadElement(this, signature);
    }

    get sorted() {
        return true;
    }
}

module.exports = MemberStruct;
