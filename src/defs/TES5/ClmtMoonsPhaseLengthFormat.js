const FormatDef = require('../FormatDef');

const moonPhaseExpr = /(Masser(?:, Secunda)?|Secunda|No Moon) \/ (\d+)/;

class ClmtMoonsPhaseLengthFormat extends FormatDef {
    moonType(masser, secunda) {
        if (masser && secunda) return 'Masser, Secunda';
        if (masser) return 'Masser';
        if (secunda) return 'Secunda';
        return 'No Moon';
    }

    dataToValue(element, data) {
        let phaseLength = data % 64,
            masser = Boolean(data & 64),
            secunda = Boolean(data & 128);
        return `${this.moonType(masser, secunda)} / ${phaseLength}`;
    }

    valueToData(element, value) {
        let match = value.match(moonPhaseExpr);
        if (!match) return 0;
        let masser = match[1].includes('Masser'),
            secunda = match[1].includes('Secunda'),
            phaseLength = parseInt(match[2]);
        return (secunda && 128) + (masser && 64) + phaseLength;
    }
}

module.exports = ClmtMoonsPhaseLengthFormat;
