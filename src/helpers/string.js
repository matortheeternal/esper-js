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

let pad = function(num, amount, str = '0') {
    return num.toString().padStart(amount, str);
};

module.exports = {strToBuffer, strEquals, pad};
