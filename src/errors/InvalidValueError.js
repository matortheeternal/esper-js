class InvalidValueError extends Error {
    constructor(def, value) {
        super(`Invalid ${def.constructor.name} value: ${value}`);
        Error.captureStackTrace(this, InvalidValueError);
    }
}

module.exports = InvalidValueError;
