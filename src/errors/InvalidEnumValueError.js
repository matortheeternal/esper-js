class InvalidEnumValueError extends Error {
    constructor(value) {
        super(`Invalid enum value: ${value}`);
        Error.captureStackTrace(this, InvalidEnumValueError);
    }
}

module.exports = InvalidEnumValueError;
