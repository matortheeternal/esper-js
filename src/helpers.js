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

module.exports = {makeReadableStream, minmax};
