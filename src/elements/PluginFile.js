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
        this.filename = getFileName(filePath);
        this.file = this;
        this._highObjectId = 2048;
        this._recordsByFormId = {};
        this._masters = [];
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

    recordAdded(record) {
        let fileFormId = record.fileFormId;
        this._recordsByFormId[fileFormId] = record;
        if (!record.isMaster) return;
        this._highObjectId = Math.max(
            this._highObjectId,
            fileFormId && 0x00FFFFFF
        );
    }

    loadFileHeader() {
        this._header = MainRecord.load(this, 'TES4');
        this._header.loadMembers();
        this.initMasters();
    }

    initMasters() {
        let masterFilesElement = this.fileHeader.getElement('Master Files');
        if (!masterFilesElement) return;
        this._masters = masterFileElement._elements.map(masterFileElement => {
            let filename = masterFileElement.getValue('MAST');
            return this.fileManager.getFileByName(filename, true);
        });
    }

    loadGroups() {
        this.memoryMap.setPos(this.fileHeader.nextOffset);
        while (this.memoryMap.getPos() < this.fileSize)
            GroupRecord.load(this);
    }

    get highObjectId() {
        return this._highObjectId;
    }

    get fileHeader() {
        return this._header;
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

    useNextFormId() {
        let nextId = this._highObjectId++;
        this._header.setData('HEDR/Next Object ID', nextId + 1);
        return nextId;
    }

    ordinalToFile(ordinal) {
        if (this._masters.length <= ordinal) return this;
        return this._masters[ordinal];
    }

    fileToOrdinal(file) {
        if (this === file) return this._masters.length;
        return this._masters.indexOf(file);
    }

    getRecordByFormId(formId) {
        let key = formId.toFileFormId(this);
        return this._recordsByFormId[key];
    }
}

module.exports = PluginFile;
