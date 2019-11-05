class InvalidPathError extends Error {
    constructor(element, path) {
        super(`Failed to resolve path ${path} from element ${element.path}`);
    }
}

module.exports = InvalidPathError;
