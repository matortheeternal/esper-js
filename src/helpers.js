const SyncReadableStream = require('file-format-parser/src/syncReadableStream');

let makeReadableStream = function(buffer) {
    let stream = Object.create(SyncReadableStream.prototype);
    stream._buffer = buffer;
    stream._pos = 0;
    return stream;
};

let minmax = function(num, minimum, maximum) {
    return Math.min(Math.max(num, minimum), maximum);
};

let strToBuffer = function(string) {
    let buf = new Buffer(string.length);
    buf.write(string);
    return buf;
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

module.exports = {makeReadableStream, minmax, strToBuffer, readUntil};
