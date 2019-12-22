const {fileExists, dirExists, assertFileExists} = require('../helpers');
const LoadOrderInterface = require('../interfaces/LoadOrderInterface');
const {Ini} = require('ini-api');
const path = require('path');
const fs = require('fs');

let getFindGameStrategy = function(strategyName) {
    return require(`./strategies/${strategyName}`);
};

class GameInstallation {
    static findGamePath(game, strategyName = 'registry') {
        let strategy = getFindGameStrategy(strategyName);
        return strategy.find(game);
    }

    static find(game) {
        let gamePath = GameInstallation.findGamePath(game);
        if (!gamePath) return;
        return new GameInstallation(game, gamePath);
    }

    constructor(game, gamePath) {
        this._game = game;
        this._gamePath = gamePath;
        LoadOrderInterface.extend(this);
    }

    loadGameIni() {
        assertFileExists(this.gameIniPath);
        return new Ini(fs.readFileSync(this.gameIniPath));
    }

    getGameLanguage() {
        return this.gameIni.getValue('General', 'sLanguage');
    }

    isValid() {
        return fileExists(this.gameIniPath) &&
            dirExists(this.dataPath) &&
            fileExists(this.exePath);
    }

    get game() {
        return this._game;
    }

    get gamePath() {
        return this._gamePath;
    }

    get myGamesPath() {
        return this._myGamesPath || (
            this._myGamesPath = path.resolve(
                GetCSIDLShellFolder(CSIDL_PERSONAL),
                'My Games',
                this._game.myGamesFolderName
            )
        );
    }

    get gameIniPath() {
        return this._gameIniPath || (
            this._gameIniPath = path.resolve(
                this.myGamesPath,
                this._game.iniName
            )
        );
    }

    get gameIni() {
        return this._gameIni || (
            this._gameIni = this.loadGameIni()
        );
    }

    get dataPath() {
        return this._dataPath || (
            this._dataPath = path.resolve(this._gamePath, 'Data')
        );
    }

    get exePath() {
        return this._exePath || (
            this._exePath = path.resolve(this._gamePath, this._game.exeName)
        )
    }

    get language() {
        return this._language || (
            this._language = this.getGameLanguage() || 'English'
        );
    }

    set language(value) {
        this._language = value;
    }
}

module.exports = GameInstallation;
