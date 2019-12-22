const {strEquals} = require('../../helpers/helpers');

module.exports = {
    priority: 0,
    match: pathPart => pathPart,
    resolve: (element, match) => {
        return element.assignedElements.find(e => {
            return strEquals(e.name, match);
        });
    }
};
