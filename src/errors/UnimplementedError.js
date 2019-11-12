class UnimplementedError extends Error {
    constructor() {
        super('Unimplemented');
        Error.captureStackTrace(this, UnimplementedError);
    }
}

module.exports = UnimplementedError;
