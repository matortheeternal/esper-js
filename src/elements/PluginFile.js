const {getFileName, assertFileExists} = require('../helpers');
const Container = require('./Container');
const MemoryMap = require('memory-map');
const GroupRecord = require('./GroupRecord');
const MainRecord = require('./MainRecord');
const MasterManager = require('../interfaces/MasterManager');
const RecordManager = require('../interfaces/RecordManager');

class PluginFile extends Container {
    constructor(session, filePath, options = {}) {
        super();
        this.session = session;
        this.filePath = filePath;
        this.filename = getFileName(filePath);
        this.file = this;
        RecordManager.extend(this);
        MasterManager.extend(this);
        this.initHeaderDefs();
        if (!options.temporary) this.fileManager.addFile(this);
    }

    static load(session, filePath) {
        assertFileExists(filePath);
        let plugin = new PluginFile(session, filePath);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.loadFileHeader();
        plugin.loadGroups();
        return plugin;
    }

    static getMasterFilenames(session, filePath) {
        let plugin = new PluginFile(session, filePath, { temporary: true });
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.loadFileHeader();
        return plugin.masterFilenames;
    }

    static init(session, filePath) {
        let plugin = new PluginFile(session, filePath);
        plugin._header = new MainRecord(this, 'TES4');
        // TODO: initialize flags based on filename
        return plugin;
    }

    loadFileHeader() {
        this._header = MainRecord.load(this, 'TES4');
        this._header.loadMembers();
        this.initMasters();
        this.initMastersByFilename();
    }

    loadGroups() {
        this.memoryMap.setPos(this.fileHeader.nextOffset);
        while (this.memoryMap.getPos() < this.fileSize)
            GroupRecord.load(this);
    }

    initHeaderDefs() {
        let manager = this.definitionManager;
        this.groupHeaderDef = manager.buildDef({id: 'GroupRecordHeader'});
    }

    get fileHeader() {
        return this._header;
    }

    get groups() {
        return this._groups.slice();
    }

    get fileManager() {
        return this.session.pluginManager;
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

    get loadOrder() {
        return this.fileManager.getFileLoadOrder(this.filename);
    }
}

module.exports = PluginFile;
