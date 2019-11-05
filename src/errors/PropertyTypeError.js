class PropertyTypeError extends Error {
    constructor(schema, key, propType) {
        super(`Expected property ${key} to have type ${schema[key]}, found type ${propType}`);
    }
}

module.exports = PropertyTypeError;
