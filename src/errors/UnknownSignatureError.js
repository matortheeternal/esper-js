class UnknownSignatureError extends Error {
    constructor(record, sig) {
        let position = record.memoryMap.getPos().toString(16);
        super(`Encountered unknown signature ${sig} when parsing ` +
            `${record.signature} record at 0+${position}`);
        Error.captureStackTrace(this, UnknownSignatureError);
    }
}

module.exports = UnknownSignatureError;
