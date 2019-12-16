const DefinitionManager = require('./DefinitionManager');
const FileManager = require('./FileManager');

class Session {
    constructor(game) {
        this._game = game;
        this.definitionManager = new DefinitionManager(game);
        this.fileManager = new FileManager(game);
    }

    loadPlugins(loadOrder) {
        loadOrder.forEach(filename => {
            let filePath = path.resolve(this.dataPath, filename);
            PluginFile.load(this, filePath);
        });
    }

    get dataPath() {
        return this._dataPath; // TODO
    }
}

module.exports = Session;
