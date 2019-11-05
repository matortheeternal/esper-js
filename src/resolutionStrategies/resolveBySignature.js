const {signatureKnown} = require('../definitionManager');

module.exports = {
    priority: 5,
    match: pathPart => {
        if (pathPart.length !== 4) return;
        if (signatureKnown(pathPart)) return pathPart;
    },
    resolve: (element, match) => {
        return element.assignedElements.find(e => e.signature === match);
    }
};
