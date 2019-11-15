const FormatDef = require('../FormatDef');

class EPFDActorValueFormat extends FormatDef {
    constructor(manager, def, parent) {
        super(manager, def, parent);
        this.enumDef = manager.buildDef({id: 'ActorValueEnum'}, parent);
    }

    dataToValue(element, data) {
        let buf = this.parent.toBytes(data);
        data = Math.round(buf.readFloatLE());
        return this.enumDef.dataToValue(element, data);
    }

    valueToData(element, value) {
        let float = this.enumDef.valueToData(element, value),
            buf = new Buffer(4);
        buf.writeFloatLE(float);
        return buf.readUInt32LE();
    }
}

module.exports = EPFDActorValueFormat;
