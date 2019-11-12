module.exports = {
    priority: 10,
    match: /^{([^}]+)}$/.exec,
    resolve: (element, match) => {
        return element.assignedElements.find(e => e.sortKey === match[1]);
    }
};
