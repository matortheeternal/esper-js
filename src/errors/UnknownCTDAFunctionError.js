class UnknownCTDAFunctionError extends Error {
    constructor(value) {
        super(`Unknown CTDA Function: ${value}`);
        Error.captureStackTrace(this, UnknownCTDAFunctionError);
    }
}

module.exports = UnknownCTDAFunctionError;
