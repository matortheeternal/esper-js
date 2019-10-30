let chars = {};

let buildChars = function(start, end, callback) {
    for (let i = start; i <= end; i++)
        chars[i] = callback(i);
};

let offsetBy = function(offset) {
    return n => String.fromCharCode(n + offset);
};

buildChars(0x0, 0x14, offsetBy(0x61));
buildChars(0x30, 0x60, String.fromCharCode);

let getCharacter = function(n) {
    let char = chars[n];
    if (!char) throw new Error(`Unknown signature character #${n}`);
    return char;
};

let getCharCode = function(char) {
    return Object.keys(chars).find(key => {
        return chars[key] === char;
    });
};

module.exports = {getCharacter, getCharCode};
