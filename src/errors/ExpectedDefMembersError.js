class ExpectedDefMembersError extends Error {
    constructor(def) {
        super(`Expected def members, found: ${JSON.stringify(def)}`);
        Error.captureStackTrace(this, ExpectedDefMembersError);
    }
}

module.exports = ExpectedDefMembersError;
