class UnionDecideError extends Error {
    constructor() {
        super('Could not decide union.');
        Error.captureStackTrace(this, UnionDecideError);
    }
}

module.exports = UnionDecideError;
