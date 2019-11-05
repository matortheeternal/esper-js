module.exports = {
    priority: 10,
    match: /^{(.+)}$/.match,
    resolve: (element, match) => {
        return element.assignedElements().find(e => e.sortKey === match[1]);
    }
};
