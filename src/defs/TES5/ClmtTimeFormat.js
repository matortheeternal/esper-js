const Def = require('../Def');
const {pad} = require('../../helpers');

const timeExpr = /^(\d{2}):(\d{2})$/;

class ClmtTimeFormat extends Def {
    dataToValue(element, data) {
        let hours = Math.floor(data / 6),
            minutes = (data % 6) * 10;
        return `${pad(hours, 2)}:${pad(minutes, 2)}`;
    }

    valueToData(element, value) {
        let match = value.match(timeExpr);
        if (!match) return parseInt(value);
        let hours = parseInt(match[1]),
            minutes = parseInt(match[2]);
        return (hours * 6) + (minutes / 10);
    }
}

module.exports = ClmtTimeFormat;
