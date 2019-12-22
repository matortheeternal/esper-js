const path = require('path');
const fs = require('fs');
const assert = require('assert');

let getFileName = function(filePath) {
    return path.basename(filePath);
};

let buildIndex = function(folderPath, keyStr) {
    if (!dirExists(folderPath)) return {};
    return fs.readdirSync(folderPath).reduce((obj, filename) => {
        if (filename === 'index.js') return obj;
        let filePath = path.join(folderPath, filename);
        if (fs.lstatSync(filePath).isDirectory()) return obj;
        let exports = require(filePath),
            key = exports[keyStr];
        if (key) obj[key] = exports;
        return obj;
    }, {});
};

let exists = function(callback) {
    return function(filePath) {
        try {
            const stat = fs.lstatSync(filePath);
            return callback(stat);
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        return false;
    }
};

let fileExists = exists(stat => stat.isFile());
let dirExists = exists(stat => stat.isDirectory());

let assertFileExists = function(filePath) {
    assert(fileExists(filePath), 'File does not exist.');
};

module.exports = {
    getFileName, buildIndex,
    fileExists, dirExists,
    assertFileExists
};
