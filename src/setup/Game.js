const EnhancedObject = require('../base/EnhancedObject');
const {
    strictValidator, array, object,
    optional, id, string
} = require('../helpers/validation');

class Game extends EnhancedObject {
    get defaults() {
        return {
            baseName: () => this.name,
            fullName: () => this.name,
            registryName: () => this.baseName,
            myGamesFolderName: () => this.name,
            appDataFolderName: () => this.name,
            exeName: () => `${this.baseName}.exe`,
            esmName: () => `${this.baseName}.esm`,
            iniName: () => `${this.baseName}.ini`,
            pluginsTxtType: () => 'plain',
            archiveExtension: () => '.bsa',
            pluginExtensions: () => ['.esp', '.esm'],
            hardcodedPlugins: () => [{ filename: this.esmName }]
        }
    }
}

Game.check = strictValidator({
    xeditId: id,
    name: string,
    baseName: optional(string),
    fullName: optional(string),
    abbreviation: string,
    registryName: optional(string),
    myGamesFolderName: optional(string),
    appDataFolderName: optional(string),
    exeName: optional(string),
    esmName: optional(string),
    iniName: optional(string),
    cccName: optional(string),
    pluginsTxtType: optional(string),
    archiveExtension: optional(string),
    pluginExtensions: optional(array(string)),
    hardcodedPlugins: optional(array(object({filename: string}))),
    steamAppIds: array(id)
});

module.exports = Game;
