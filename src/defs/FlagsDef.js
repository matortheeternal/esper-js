const FormatDef = require('./FormatDef');
const {UnknownFlagError} = require('../errors');
const {getBits} = require('../helpers');

const unknownFlagExpr = /^Unknown (\d+)$/;

class FlagsDef extends FormatDef {
    getFlagValue(index) {
        return this.flags[index] || `Unknown ${index}`;
    }

    getFlagIndex(flag) {
        let index = Object.keys(this.flags).find(index => {
            return this.flags[index] === flag;
        });
        if (index !== undefined) return parseInt(index);
        let match = flag.match(unknownFlagExpr);
        if (!match) throw new UnknownFlagError(flag);
        return parseInt(match[1]);
    }

    dataToArray(element, data) {
        let bits = getBits(data).reverse();
        return bits.reduce((a, bit, index) => {
            if (bit) a.push(this.getFlagValue(index));
            return a;
        }, []);
    };

    dataToValue(element, data) {
        return this.dataToArray(element, data).join(', ');
    }

    valueToData(element, value) {
        if (value === '') return 0;
        return value.split(', ').reduce((data, flag) => {
            let index = this.getFlagIndex(flag);
            if (index >= 8 * this.parent.size)
                throw new Error(`Flag index out of bounds: ${index}`);
            return data + Math.pow(2, index);
        }, 0);
    }

    get flags() {
        return this.src.flags;
    }
}

module.exports = Object.assign(FlagsDef, {
    defType: 'flags'
});
