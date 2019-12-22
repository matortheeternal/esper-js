const DefinitionManager = require('./DefinitionManager');
const PluginManager = require('./PluginManager');
const path = require('path');
const assert = require('assert');

class Session {
    constructor(game, options = {}) {
        this._game = game;
        this.dataPath = process.cwd();
        this.options = Object.assign(Session.defaultOptions, options);
        this.definitionManager = new DefinitionManager(game);
        this.pluginManager = new PluginManager(game);
    }

    useInstallation(installation) {
        assert.strictEqual(installation._game, this._game);
        if (!installation.isValid())
            throw new Error('Game installation is not valid.');
        this.installation = installation;
        this.dataPath = installation.dataPath;
    }

    getPluginFilePath(filePath) {
        if (path.isAbsolute(filePath)) return filePath;
        return path.resolve(this.dataPath, filePath);
    }

    loadPlugins(pluginsToLoad) {
        pluginsToLoad.forEach(filePath => {
            PluginFile.load(this, this.getPluginFilePath(filePath));
        });
    }
}

Session.defaultOptions = require('./defaultSessionOptions');

module.exports = Session;
