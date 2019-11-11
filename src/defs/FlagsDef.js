const Def = require('./Def');
const {getBits} = require('../helpers');

class FlagsDef extends Def {
    dataToValue(element, data) {
        let buf = this.parent.toBytes(data);
        return getBits(buf).reduce((a, bit, index) => {
            if (bit) a.push(this.flags[index]);
            return a;
        }, []);
    }
}

module.exports = Object.assign(FlagsDef, {
    defType: 'flags'
});
