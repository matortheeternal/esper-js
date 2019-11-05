class ExpectedDefMembersError extends Error {
    constructor(def) {
        super(`Expected def members, found: ${JSON.stringify(def)}`);
    }
}

module.exports = ExpectedDefMembersError;
