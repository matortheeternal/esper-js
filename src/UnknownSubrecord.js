const {readSize} = require('./helpers');

class UnknownSubrecord {
    constructor(container, signature) {
        this.container = container;
        this.signature = signature;
        this.file = container.file;
        let memoryMap = container.file.memoryMap;
        this.offset = memoryMap.getPos() - 4;
        this.size = readSize(memoryMap);
        this.data = memoryMap.read(this.size);
        container.unknownSubrecord(this);
    }
}

module.exports = UnknownSubrecord;
