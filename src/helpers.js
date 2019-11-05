const PropertyTypeError = require('./errors/PropertyTypeError');
const path = require('path');

let minmax = function(num, minimum, maximum) {
    return Math.min(Math.max(num, minimum), maximum);
};

let strToBuffer = function(string) {
    let buf = new Buffer(string.length);
    buf.write(string);
    return buf;
};

let strEquals = function(str1, str2) {
    return str1.localeCompare(str2, undefined, {
        sensitivity: 'accent'
    }) === 0;
};

let readUntil = function(stream, val, size = 1, methodName = 'readUInt8') {
    let bytes = [];
    while (true) {
        let chunk = stream.read(size);
        if (chunk[methodName]() === val) break;
        bytes.push(chunk);
    }
    return Buffer.concat(bytes);
};

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
    })
};

let getFileName = function(filePath) {
    return path.basename(filePath);
};

module.exports = {
    minmax, strToBuffer, strEquals, readUntil,
    expectProperties, getFileName
};
