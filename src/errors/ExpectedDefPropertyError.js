class ExpectedDefPropertyError extends Error {
    constructor(def, prop) {
        super(`Expected def property ${prop}, found: ${JSON.stringify(def)}`);
        Error.captureStackTrace(this, ExpectedDefPropertyError);
    }
}

module.exports = ExpectedDefPropertyError;
