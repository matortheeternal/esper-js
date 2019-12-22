const MaybeSubrecordDef = require('./MaybeSubrecordDef');
const ValueElement = require('../elements/ValueElement');
const {UnimplementedError} = require('../errors');

class ValueDef extends MaybeSubrecordDef {
    write(data, stream) {
        super.write(stream);
        stream.write(this.toBytes(data));
    }

    getData(element) {
        return element._data;
    }

    setData(element, data) {
        element._data = data;
    }

    toBytes(data) {
        throw new UnimplementedError();
    }

    load(container) {
        if (this.src.hasOwnProperty('inheritFrom')) {
            let value = container[this.src.inheritFrom];
            return new ValueElement(container, this, value);
        }
        return ValueElement.load(container, this);
    }

    read(element) {
        super.read(element);
        this.setData(element, this.readData(element.file.memoryMap));
    }

    getMasterReferences() {}

    referencedRecord(element) {
        throw new Error(`${element.name} does not reference records.`);
    }
}

module.exports = ValueDef;
