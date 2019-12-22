let minmax = function(num, minimum, maximum) {
    return Math.min(Math.max(num, minimum), maximum);
};

let isPositiveInteger = function(num) {
    return typeof num === 'number' &&
        Math.floor(num) === num &&
        num >= 0;
};

module.exports = { minmax, isPositiveInteger };
