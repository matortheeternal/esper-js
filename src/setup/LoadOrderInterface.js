const {fileExists} = require('../helpers');
const pluginsTxtParsers = require('./pluginsTxtParsers');
const EmptyClass = require('../base/EmptyClass');
const path = require('path');
const fs = require('fs');

module.exports = (BaseClass = EmptyClass) =>
class LoadOrderInterface extends BaseClass {
    getAvailableHardcodedPlugins() {
        return this.hardcodedPlugins.filter(({filename}) => {
            let filePath = path.resolve(this.dataPath, filename);
            return fileExists(filePath);
        }).map(plugin => plugin.filename);
    }

    fixPluginOrder(pluginsToFix, plugins) {
        pluginsToFix.forEach((filename, index) => {
            let oldIndex = plugins.indexOf(filename);
            if (oldIndex > -1 && oldIndex !== index)
                plugins.splice(oldIndex, 1);
            plugins.splice(index, 0, filename);
        });
    }

    parsePlugins() {
        if (!fileExists(this.pluginsTxtPath))
            return this.availablePlugins;
        return this.pluginsTxtParser.parse(this.pluginsText);
    }

    get pluginsTxtParser() {
        return pluginsTxtParsers[this.game.pluginsTxtType];
    }

    get availablePlugins() {
        return fs.readdirSync(this.dataPath).filter(filename => {
            let filePath = path.resolve(this.dataPath, filename);
            if (fs.lstatSync(filePath).isDirectory()) return;
            let ext = path.extname(filename);
            return this.game.pluginExtensions.includes(ext);
        });
    }

    get creationClubPlugins() {
        if (!this.game.cccName) return [];
        let filePath = path.resolve(this.dataPath, this.game.cccName);
        if (!fileExists(filePath)) return [];
        return fs.readFileSync(filePath).split('\r\n')
            .map(filename => ({ filename }));
    }

    get hardcodedPlugins() {
        return Array.prototype.concat(
            this.game.hardcodedPlugins,
            this.creationClubPlugins
        );
    }

    get pluginsTxtPath() {
        return this._pluginsTxtPath || (
            this._pluginsTxtPath = path.resolve(
                this.appDataPath,
                'plugins.txt'
            )
        );
    }

    get pluginsText() {
        return this._pluginsText || (
            this._pluginsText = fs.readFileSync(this.pluginsTxtPath)
        );
    }

    get enabledPlugins() {
        let plugins = this.parsePlugins()
            .filter(plugin => plugin.enabled && this.pluginAvailable(plugin))
            .map(plugin => plugin.filename);
        let hardcodedPlugins = this.getAvailableHardcodedPlugins();
        this.fixPluginOrder(hardcodedPlugins, plugins);
        return plugins;
    }

    get pluginOrder() {

    }

    get loadOrder() {

    }
};
