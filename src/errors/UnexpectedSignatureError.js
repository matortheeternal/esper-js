class UnexpectedSignatureError extends Error {
    constructor(expectedSig, foundSig) {
        super(`Expected signature ${expectedSig}, found ${foundSig}`);
        Error.captureStackTrace(this, UnexpectedSignatureError);
    }
}

module.exports = UnexpectedSignatureError;
