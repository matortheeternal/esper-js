const PropertyTypeError = require('../errors/PropertyTypeError');

let getPropType = function(prop) {
    if (prop === null) return 'null';
    let propType = typeof prop;
    if (propType !== 'object') return propType;
    return prop.constructor.name;
};

let expectProperties = function(obj, schema) {
    Object.keys(schema).forEach(key => {
        let propType = getPropType(obj[key]);
        if (propType !== schema[key])
            throw new PropertyTypeError(schema, key, propType);
    });
};

let clone = function(value) {
    if (value === null || typeof value !== 'object') return value;
    return value.constructor === Array
        ? cloneArray(value)
        : cloneObject(value);
};

let cloneArray = function(ary) {
    return ary.map(v => clone(v));
};

let cloneObject = function(obj) {
    return Object.keys(obj).reduce((newObj, key) => {
        newObj[key] = clone(obj[key]);
        return newObj;
    }, {});
};

module.exports = {getPropType, expectProperties, clone};
