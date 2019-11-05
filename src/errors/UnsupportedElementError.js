class UnsupportedElementError extends Error {
    constructor(element, opName) {
        super(`Element ${element.path} does not support the ${opName} operation.`);
    }
}

module.exports = UnsupportedElementError;
