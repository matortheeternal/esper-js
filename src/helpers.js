const PropertyTypeError = require('./errors/PropertyTypeError');
const path = require('path');

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

let getBits = function(buf, littleEndian = false) {
    let bits = [],
        a = Array.from(buf);
    if (littleEndian) a.reverse();
    a.forEach(byte => {
        bits.push(+Boolean(byte & 0x80));
        bits.push(+Boolean(byte & 0x40));
        bits.push(+Boolean(byte & 0x20));
        bits.push(+Boolean(byte & 0x10));
        bits.push(+Boolean(byte & 0x8));
        bits.push(+Boolean(byte & 0x4));
        bits.push(+Boolean(byte & 0x2));
        bits.push(+Boolean(byte & 0x1));
    });
    return bits;
};

let pad = function(num, amount, str = '0') {
    return num.toString().padStart(amount, str);
};

module.exports = {
    minmax, strToBuffer, strEquals, readUntil,
    expectProperties, getFileName, clone, getBits,
    pad
};
