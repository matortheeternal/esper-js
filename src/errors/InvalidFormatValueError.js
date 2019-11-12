class InvalidFormatValueError extends Error {
    constructor(def, value) {
        super(`Invalid ${def.constructor.name} value: ${value}`);
        Error.captureStackTrace(this, InvalidFormatValueError);
    }
}

module.exports = InvalidFormatValueError;
