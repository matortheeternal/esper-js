const PropertyTypeError = require('./errors/PropertyTypeError');
const path = require('path');
const fs = require('fs');

let minmax = function(num, minimum, maximum) {
    return Math.min(Math.max(num, minimum), maximum);
};

let strToBuffer = function(string) {
    let buf = new Buffer(string.length);
    buf.write(string, 'ascii');
    return buf;
};

let strEquals = function(str1, str2) {
    return str1.localeCompare(str2, undefined, {
        sensitivity: 'accent'
    }) === 0;
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
    });
};

let getFileName = function(filePath) {
    return path.basename(filePath);
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

let getBits = function(num) {
    let bits = [];
    while (num > 0) {
        bits.unshift(num % 2);
        num = Math.floor(num / 2);
    }
    return bits;
};

let pad = function(num, amount, str = '0') {
    return num.toString().padStart(amount, str);
};

let isPositiveInteger = function(num) {
    return typeof num === 'number' &&
        Math.floor(num) === num &&
        num >= 0;
};

let buildIndex = function(folderPath, keyStr) {
    if (!fs.existsSync(folderPath)) return {};
    return fs.readdirSync(folderPath).reduce((obj, filename) => {
        if (filename === 'index') return obj;
        let filePath = path.join(folderPath, filename);
        if (fs.lstatSync(filePath).isDirectory()) return obj;
        let exports = require(filePath),
            key = exports[keyStr];
        if (key) obj[key] = exports;
        return obj;
    }, {});
};

module.exports = {
    minmax, strToBuffer, strEquals, expectProperties,
    getFileName, clone, getBits, pad, isPositiveInteger,
    buildIndex
};
