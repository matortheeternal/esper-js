module.exports = {
    priority: 5,
    match: (pathPart, element) => {
        if (pathPart.length !== 4) return;
        return pathPart;
        //if (element.def.containsSignature(pathPart)) return pathPart;
    },
    resolve: (element, match) => {
        return element.assignedElements.find(e => e.signature === match);
    }
};
