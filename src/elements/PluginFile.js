const {getFileName} = require('../helpers');
const Container = require('./Container');
const MemoryMap = require('memory-map');
const GroupRecord = require('./GroupRecord');
const MainRecord = require('./MainRecord');

class PluginFile extends Container {
    constructor(session, filePath, init = true) {
        super();
        this.session = session;
        this.filePath = filePath;
        this.fileName = getFileName(filePath);
        this.file = this;
        if (init) this.init();
    }

    static load(filePath) {
        let plugin = new PluginFile(filePath, false);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.fileSize = plugin.memoryMap.getSize();
        plugin.parseFileHeader();
        plugin.parseGroups();
        plugin.fileManager.addFile(this);
        return plugin;
    }

    parseFileHeader() {
        this._fileHeader = MainRecord.load(this, 0, 'TES4');
        this.loadMasters();
    }

    loadMasters() {
        let masterFileElements = this.fileHeader.getElements('Masters Files');
        this._masters = masterFileElements.map(masterFileElement => {
            let filename = masterFileElement.getValue('MAST');
            return this.fileManager.getFileByName(filename, true);
        });
    }

    parseGroups() {
        this.memoryMap.setPos(this.fileHeader.nextOffset);
        while (this.memoryMap.getPos() < this.fileSize)
            GroupRecord.load(this);
    }

    get fileHeader() {
        return this._fileHeader;
    }

    get masters() {
        return this._masters.slice();
    }

    get groups() {
        return this._groups.slice();
    }

    get fileManager() {
        return this.session.fileManager;
    }

    get definitionManager() {
        return this.session.definitionManager;
    }

    init() {
        // TODO: initialize ESM/ESL flag based on filename
        this._fileHeader = new MainRecord(this, 'TES4');
    }

    // TODO: verify next id isn't in use
    useNextFormId() {
        let nextId = this._fileHeader.getData('HEDR/Next Object ID');
        this._fileHeader.setData('HEDR/Next Object ID', nextId + 1);
        return nextId;
    }

    ordinalToFile(ordinal) {
        if (this.masters.length <= ordinal) return this;
        return this.masters[ordinal];
    }

    fileToOrdinal(file) {
        if (this === file) return this.masters.length;
        return file.masters.indexOf(file);
    }
}

module.exports = PluginFile;
