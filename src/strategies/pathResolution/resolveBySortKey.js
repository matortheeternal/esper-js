const sortKeyExpr = /^{([^}]+)}$/;

module.exports = {
    priority: 10,
    match: pathPart => pathPart.match(sortKeyExpr),
    resolve: (element, match) => {
        return element.assignedElements.find(e => e.sortKey === match[1]);
    }
};
