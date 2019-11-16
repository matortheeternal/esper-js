class UnsupportedElementError extends Error {
    constructor(element, opName) {
        super(`Element ${element.path} does not support the ${opName} operation.`);
        Error.captureStackTrace(this, UnsupportedElementError);
    }
}

module.exports = UnsupportedElementError;
