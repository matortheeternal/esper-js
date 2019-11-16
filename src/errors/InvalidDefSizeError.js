class InvalidDefSizeError extends Error {
    constructor(def) {
        super(`Def ${def.name || def.type} has invalid size: ${def.size}`);
        Error.captureStackTrace(this, InvalidDefSizeError);
    }
}

module.exports = InvalidDefSizeError;
