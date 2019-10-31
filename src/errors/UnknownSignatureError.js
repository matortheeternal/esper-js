class UnknownSignatureError extends Error {
    constructor(record, sig) {
        let position = record.memoryMap.getPos().toString(16),
            message = `Encountered unknown signature ${sig} when parsing ` +
                `${record.signature} record at 0+${position}`;
        super(message);
    }
}

module.exports = UnknownSignatureError;
