const {getFileName} = require('../helpers');
const MemoryMap = require('memory-map');
const GroupRecord = require('./GroupRecord');
const MainRecord = require('./MainRecord');

class PluginFile {
    constructor(filePath, init = true) {
        this.filePath = filePath;
        this.fileName = getFileName(filePath);
        this.file = this;
        this._groups = [];
        if (init) this.init();
    }

    static load(filePath) {
        let plugin = new PluginFile(filePath, false);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.fileSize = plugin.memoryMap.getSize();
        plugin.parseFileHeader();
        plugin.parseGroups();
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
            return getFileByName(filename, true);
        });
    }

    parseGroups() {
        this.memoryMap.setPos(this.fileHeader.dataSize);
        while (this.memoryMap.getPos() < this.fileSize)
            this._groups.push(GroupRecord.load(this));
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

    init() {
        // TODO: initialize ESM/ESL flag based on filename
        this._fileHeader = new MainRecord('TES4');
    }

    // TODO: verify next id isn't in use
    useNextFormId() {
        let nextId = this._fileHeader.getValue('HEDR/Next Object ID');
        this._fileHeader.setValue('HEDR/Next Object ID', nextId + 1);
        return nextId;
    }

    ordinalToFile(ordinal) {
        if (this.masters.length <= ordinal) return this;
        return this.masters[ordinal];
    }
}

module.exports = PluginFile;
