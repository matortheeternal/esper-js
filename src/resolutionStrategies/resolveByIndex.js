module.exports = {
    priority: 10,
    match: /^\[(\d+)]$/.exec,
    resolve: (element, match) => {
        let index = parseInt(match[1]),
            elements = element.assignedElements;
        if (index >= elements.length)
            throw new Error('Index out of bounds.');
        return elements[index];
    }
};
