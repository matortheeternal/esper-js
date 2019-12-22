const Validator = require('fastest-validator');

let v = new Validator();
let id = { type: 'number', positive: true, integer: true };
let string = { type: 'string', empty: false };

let array = (items) => ({ type: 'array', items });
let object = (schema) => ({ type: 'object', ...schema });
let optional = (schema) => ({ ...schema, optional: true });

let validator = (schema) => v.compile(schema);

let strictValidator = (schema) => {
    schema.$$strict = true;
    return v.compile(schema);
};

module.exports = {
    id, string, array, object, optional,
    validator, strictValidator
};
