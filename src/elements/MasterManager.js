const EmptyClass = require('../base/EmptyClass');

module.exports = (BaseClass = EmptyClass) =>
class MasterManager extends BaseClass {
    constructor() {
        super();
        this._masters = [];
        this._mastersByFilename = {};
    }

    initMasters() {
        let masterFilesElement = this.fileHeader.getElement('Master Files');
        if (!masterFilesElement) return;
        this._masters = masterFilesElement._elements.map(masterFileElement => {
            let filename = masterFileElement.getData('MAST');
            return this.pluginManager.getFileByName(filename, true);
        });
    }

    initMastersByFilename() {
        this._mastersByFilename = this._masters.reduce((obj, file, index) => {
            obj[file.filename] = index;
            return obj;
        }, {});
    }

    updateMastersElement() {
        let masterFilesElement = this.fileHeader.getElement('Master Files');
        this._masters.forEach(masterFile => {
            let masterFileElement = masterFilesElement.addElement();
            masterFileElement.setData('MAST', masterFile.filename);
        });
    }

    ordinalToFile(ordinal) {
        if (this._masters.length <= ordinal) return this;
        return this._masters[ordinal];
    }

    fileToOrdinal(file) {
        if (this === file) return this._masters.length;
        return this._mastersByFilename[file.filename];
    }

    mastersUpdated() {
        this.initMastersByFilename();
        if (!this.keepMasterElementsUpdated) return;
        this.updateMastersElement();
    }

    hasMaster(file) {
        return this._mastersByFilename.hasOwnProperty(file.filename);
    }

    addMaster(file) {
        if (this.hasMaster(file)) return;
        let targetIndex = this._masters.findIndex(masterFile => {
            return masterFile.loadOrder > file.loadOrder;
        });
        this._masters.splice(targetIndex, 0, file);
        this.mastersUpdated();
    }

    removeMaster(file, removeReferences = false) {
        // TODO: check/remove references
        if (!this.hasMaster(file)) return;
        let index = this._mastersByFilename[file.filename];
        this._masters.splice(index, 1);
        this.mastersUpdated();
    }

    getMasterReferences(trackRefs = true) {
        let references = this._masters.reduce((obj, master) => {
            obj[master.filename] = trackRefs ? [] : 0;
            return obj;
        });
        super.getMasterReferences(references, trackRefs);
        return references;
    }

    getUnusedMasters() {
        let referencedMasters = this.getMasterReferences(false);
        return Object.keys(referencedMasters).filter(filename => {
            return referencedMasters[filename] === 0;
        });
    }

    removeUnusedMasters() {
        let unusedMasters = this.getUnusedMasters();
        this._masters = this._masters.filter(master => {
            return !unusedMasters.includes(master.filename);
        });
        this.mastersUpdated();
    }

    get keepMasterElementsUpdated() {
        return this.session.options.keepMasterElementsUpdated;
    }

    get masters() {
        return this._masters.slice();
    }

    get masterFilenames() {
        return this._masters.map(m => m.filename);
    }
};
