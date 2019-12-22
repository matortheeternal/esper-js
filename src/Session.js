const DefinitionManager = require('./DefinitionManager');
const PluginManager = require('./PluginManager');

class Session {
    constructor(game) {
        this._game = game;
        this.definitionManager = new DefinitionManager(game);
        this.pluginManager = new PluginManager(game);
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
