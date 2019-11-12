const Def = require('./Def');
const UnknownFlagError = require('../errors/UnknownFlagError');
const {getBits} = require('../helpers');

class FlagsDef extends Def {
    dataToValue(element, data) {
        let buf = this.parent.toBytes(data);
        return getBits(buf).reduce((a, bit, index) => {
            if (bit) a.push(this.flags[index]);
            return a;
        }, []);
    }

    valueToData(element, value) {
        return value.reduce((data, flag) => {
            let index = this.flags.indexOf(flag);
            if (index === -1) throw new UnknownFlagError(flag);
            return data + Math.pow(2, index);
        }, 0);
    }
}

module.exports = Object.assign(FlagsDef, {
    defType: 'flags'
});
