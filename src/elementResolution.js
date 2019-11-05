const {expectProperties} = require('./helpers');
const CannotResolveError = require('./errors/CannotResolveError');

let resolutionStrategies = [];

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

let resolveElement = function(element, pathPart) {
    if (!element.hasOwnProperty('elements'))
        throw new CannotResolveError(element);
    for (let strategy of resolutionStrategies) {
        let match = strategy.match(pathPart);
        if (match) return strategy.resolve(this, match);
    }
};

let getElement = function(element, path) {
    let [pathPart, remainingPath] = splitPath(path),
        resolvedElement = resolveElement(element, pathPart);
    return remainingPath.length > 0
        ? resolvedElement.getElement(remainingPath)
        : resolvedElement;
};

let sortResolutionStrategies = function() {
    resolutionStrategies.sort((a, b) => {
        return b.priority - a.priority;
    });
};

let addResolutionStrategy = function(strategy) {
    expectProperties(strategy, resolutionStrategySchema);
    resolutionStrategies.push(strategy);
    sortResolutionStrategies();
};

module.exports = {getElement, addResolutionStrategy};
