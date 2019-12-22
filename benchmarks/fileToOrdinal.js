const Benchmark = require('benchmark');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const alphaNumeric = alphabet + alphabet.toUpperCase() + numbers;

let randomNumberInRange = function(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

let randomOption = function(options) {
    return options[Math.floor(Math.random() * options.length)];
};

let fakeFilename = function(minLength, maxLength, extension) {
    let len = randomNumberInRange(minLength, maxLength),
        str = '';
    for (let i = 0; i < len; i++)
        str += randomOption(alphaNumeric);
    return str + extension;
};

let fakeMasters = function(count) {
    let masters = [];
    for (let i = 0; i < count; i ++)
        masters.push(fakeFilename(10, 20, '.esp'));
    return masters;
};

let getMastersByFilename = function(masters) {
    return masters.reduce((obj, file, index) => {
        obj[file.filename] = index;
        return obj;
    }, {});
};

let masters = fakeMasters(255);
let masterNames = masters.map(master => master.filename);
let mastersByFilename = getMastersByFilename(masters);

new Benchmark.Suite()
    .add('mastersByFilename', function() {
        let masterName = randomOption(masterNames);
        mastersByFilename[masterName];
    })
    .add('masters.findIndex', function() {
        let masterName = randomOption(masterNames);
        masters.findIndex(master => master.filename === masterName);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });
