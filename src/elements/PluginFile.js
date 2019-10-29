const {getFileName} = require('../helpers');
const MemoryMap = require('memory-map');
const GroupRecord = require('./GroupRecord');
const MainRecord = require('./MainRecord');

class PluginFile {
    constructor(filePath, init = true) {
        this.filePath = filePath;
        this.fileName = getFileName(filePath);
        this.file = this;
        if (!init) return;
        this._fileHeader = new MainRecord('TES4');
        this._groups = [];
    }

    static load(filePath) {
        let plugin = new PluginFile(filePath, false);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.parseFileHeader();
        plugin.parseGroups();
        return plugin;
    }

    parseFileHeader() {
        this._fileHeader = MainRecord.load(this, 0, 'TES4');
        let masterFileElements = this.fileHeader.getElements('Masters Files');
        this._masters = masterFileElements.map(masterFileElement => {
            let filename = masterFileElement.getValue('MAST');
            return getFileByName(filename, true);
        });
    }

    get fileHeader() {
        return this._fileHeader;
    }

    parseGroups() {
        this._groups = [];
        let offset = this.fileHeader.nextOffset;
        while (offset < this.memoryMap.length) {
            let group = GroupRecord.load(this, offset, 'GRUP');
            this._groups.push(group);
        }
    }

    get groups() {
        if (!this._groups) this.parseGroups();
        return this._groups;
    }

    get masters() {
        return this._masters.slice();
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
