class PropertyTypeError extends Error {
    constructor(schema, key, propType) {
        super(`Expected property ${key} to have type ${schema[key]}, found type ${propType}`);
        Error.captureStackTrace(this, InvalidEnumValueError);
    }
}

module.exports = PropertyTypeError;
