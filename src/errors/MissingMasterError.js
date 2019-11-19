class MissingMasterError extends Error {
    constructor(targetFile, file) {
        super(`Target file ${targetFile.filename} does not have ${file.filename} as a master.`);
        Error.captureStackTrace(this, MissingMasterError);
    }
}

module.exports = MissingMasterError;
