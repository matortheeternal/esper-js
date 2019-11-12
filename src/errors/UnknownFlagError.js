class UnknownFlagError extends Error {
    constructor(flag) {
        super(`Unknown flag: ${flag}`);
        Error.captureStackTrace(this, UnknownFlagError);
    }
}

module.exports = UnknownFlagError;
