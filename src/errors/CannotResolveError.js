class CannotResolveError extends Error {
    constructor(element) {
        super(`Cannot resolve elements from ${element.path} - element cannot contain child elements.`);
    }
}

module.exports = CannotResolveError;
