const FormatDef = require('../FormatDef');
const {getTintLayerName} = require('../../tintLayerCache');

class TintLayerFormat extends FormatDef {
    dataToValue(element, data) {
        let actor = element.record,
            race = actor.getElement('RNAM\\@W'),
            female = actor.getFlag('ACBS\\Flags', 'Female');
        if (!race) return `${data}`;
        let name = getTintLayerName(race, female, data);
        return `${data} ${name}`;
    }

    valueToData(element, value) {
        return parseInt(value);
    }
}

module.exports = TintLayerFormat;
