let getBits = function(num) {
    let bits = [];
    while (num > 0) {
        bits.unshift(num % 2);
        num = Math.floor(num / 2);
    }
    return bits;
};

let readSize = function(stream) {
    return stream.read(2).readUInt16LE();
};

module.exports = {getBits, readSize};
