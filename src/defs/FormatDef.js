const Def = require('./Def');
const UnimplementedError = require('../errors/UnimplementedError');

class FormatDef extends Def {
    dataToValue(element, data) {
        throw new UnimplementedError();
    }

    valueToData(element, value) {
        throw new UnimplementedError();
    }
}

module.exports = FormatDef;
