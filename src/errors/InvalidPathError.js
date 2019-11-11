class InvalidPathError extends Error {
    constructor(element, path) {
        super(`Failed to resolve path ${path} from element ${element.path}`);
        Error.captureStackTrace(this, InvalidEnumValueError);
    }
}

module.exports = InvalidPathError;
