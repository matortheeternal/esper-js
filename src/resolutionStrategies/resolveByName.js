const {strEquals} = require('../helpers');

module.exports = {
    priority: 0,
    match: /^.+$/.match,
    resolve: (element, match) => {
        return element.assignedElements.find(e => {
            return strEquals(e.name, match[0]) ||
                strEquals(e.displayName, match[0]);
        });
    }
};
