const UnsupportedElementError = require('../errors/UnsupportedElementError');
const InvalidPathError = require('../errors/InvalidPathError');
const {expectProperties} = require('../helpers');
const path = require('path');
const fs = require('fs');

let resolutionStrategySchema = {
    match: 'function',
    resolve: 'function'
};

let splitPath = function(path) {
    let separatorIndex = path.indexOf('\\');
    if (separatorIndex === -1) separatorIndex = path.length;
    return [
        path.slice(0, separatorIndex),
        path.slice(separatorIndex + 1)
    ];
};

let loadResolutionStrategies = function() {
    let folderPath = path.resolve('../src/strategies/pathResolution');
    fs.readdirSync(folderPath).forEach(filename => {
        let filePath = path.join(folderPath, filename),
            strategy = require(filePath);
        Element.addResolutionStrategy(strategy);
    });
};

class Element {
    constructor(container, def) {
        if (def) this.def = def;
        if (!container) return;
        this.container = container;
        this.file = container.file;
        container.elementAdded(this);
    }

    static addResolutionStrategy(strategy) {
        expectProperties(strategy, resolutionStrategySchema);
        Element.resolutionStrategies.push(strategy);
        Element.resolutionStrategies.sort((a, b) => {
            return b.priority - a.priority;
        });
    }

    get signature() {
        return this.def.signature;
    }

    get name() {
        return this.def.name;
    }

    get path() {
        if (!this.container) return this.pathName;
        return `${this.container.path}\\${this.pathName}`;
    }

    get size() {
        return this._size || this.def.size;
    }

    getMasterReferences() {}

    resolveElement(pathPart) {
        let strategies = Element.resolutionStrategies;
        for (let strategy of strategies) {
            let match = strategy.match(pathPart, this);
            if (match) return strategy.resolve(this, match);
        }
    }

    getElement(path) {
        let [pathPart, remainingPath] = splitPath(path),
            element = this.resolveElement(pathPart);
        return remainingPath.length > 0
            ? element.getElement(remainingPath)
            : element;
    }

    getElements(path) {
        let element = this.getElement(path);
        if (!element) throw new InvalidPathError(this, path);
        return element.elements;
    }

    getData(path) {
        let element = this.getElement(path);
        if (!element) return;
        return element.data;
    }

    setData(path, data) {
        let element = this.getElement(path);
        if (!element) throw new InvalidPathError(this, path);
        if (!element.hasOwnProperty('data'))
            throw new UnsupportedElementError(element, 'setData');
        element.data = data;
    }
}

module.exports = Object.assign(Element, {
    resolutionStrategies: []
});

loadResolutionStrategies();
