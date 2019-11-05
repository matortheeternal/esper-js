const DefinitionManager = require('./DefinitionManager');
const FileManager = require('./FileManager');

class Session {
    constructor(game) {
        this.definitionManager = new DefinitionManager(game);
        this.fileManager = new FileManager(game);
    }
}

module.exports = Session;
