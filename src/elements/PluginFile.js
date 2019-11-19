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
        this.initHeaderDefs();
        this.fileManager.addFile(this);
        if (init) this.init();
    }

    static load(session, filePath) {
        let plugin = new PluginFile(session, filePath, false);
        plugin.memoryMap = new MemoryMap(filePath);
        plugin.parseFileHeader();
        plugin.parseGroups();
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

    get highObjectId() {
        return this._highObjectId;
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

    get fileSize() {
        if (!this.memoryMap) return;
        return this.memoryMap.getSize();
    }

    initHeaderDefs() {
        let {resolveDef, buildDef} = this.definitionManager;
        this.groupHeaderDef = buildDef(resolveDef('GroupRecordHeader'));
    }

    init() {
        // TODO: initialize ESM/ESL flag based on filename
        this._fileHeader = new MainRecord(this, 'TES4');
    }

    useNextFormId() {
        let nextId = this._highObjectId++;
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

    getRecordByFormId(formId) {
        let key = formId.toFileFormId(this);
        return this._recordsByFormId[key];
    }
}

module.exports = PluginFile;
