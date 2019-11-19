const FormatDef = require('../FormatDef');

// WTHR record, RNAM and QNAM subrecords
// float encoded as uint8: 0x00->-0.1, 0x7f->0, 0xfe->0.1
// see https://en.uesp.net/wiki/Tes5Mod:Mod_File_Format/WTHR
class CloudSpeedFormat extends FormatDef {
    dataToValue(element, data) {
        let float = (data - 127)/1270;
        return float.toFixed(4);
    }

    valueToData(element, value) {
        let float = parseFloat(value);
        return Math.min(Math.round(float * 1270 + 127), 254);
    }
}

module.exports = CloudSpeedFormat;
