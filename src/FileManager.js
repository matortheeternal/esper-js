class FileManager {
    constructor(game) {
        this._game = game;
        this._files = [];
        this._dummyFiles = [];
    }

    findOrCreateDummyFile(filename) {
        let file = this._dummyFiles.find(file => file.filename === filename);
        if (!file) {
            file = {dummy: true, filename};
            this._dummyFiles.push(file);
        }
        return file;
    }

    getFileByName(filename, returnDummies = false) {
        let file = this._files.find(file => file.filename === filename);
        if (file) return file;
        if (returnDummies) return this.findOrCreateDummyFile(filename);
    }

    getFileByIndex(index) {
        return this._files[index];
    }

    addFile(pluginFile) {
        this._files.push(pluginFile);
    }
}

module.exports = FileManager;
