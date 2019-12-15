const {getFileName} = require('../helpers');
const Container = require('./Container');
const MemoryMap = require('memory-map');
const GroupRecord = require('./GroupRecord');
const MainRecord = require('./MainRecord');
const MasterManager = require('../interfaces/MasterManager');
const RecordManager = require('../interfaces/RecordManager');

class PluginFile extends Container {
    constructor(session, filePath, init = true) {
        super();
        this.session = session;
        this.filePath = filePath;
        this.filename = getFileName(filePath);
        this.file = this;
        RecordManager.extend(this);
        MasterManager.extend(this);
        this.initHeaderDefs();
        this.fileManager.addFile(this);
        if (init) this.init();
    }

    static load(session, filePath) {
        let plugin = new PluginFile(session, filePath, false);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.loadFileHeader();
        plugin.loadGroups();
        return plugin;
    }

    loadFileHeader() {
        this._header = MainRecord.load(this, 'TES4');
        this._header.loadMembers();
        this.initMasters();
    }

    loadGroups() {
        this.memoryMap.setPos(this.fileHeader.nextOffset);
        while (this.memoryMap.getPos() < this.fileSize)
            GroupRecord.load(this);
    }

    get fileHeader() {
        return this._header;
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

    get fileSize() {
        if (!this.memoryMap) return;
        return this.memoryMap.getSize();
    }

    get pathName() {
        return this.filename;
    }

    initHeaderDefs() {
        let manager = this.definitionManager;
        this.groupHeaderDef = manager.buildDef({id: 'GroupRecordHeader'});
    }

    init() {
        // TODO: initialize ESM/ESL flag based on filename
        this._header = new MainRecord(this, 'TES4');
    }
}

module.exports = PluginFile;
