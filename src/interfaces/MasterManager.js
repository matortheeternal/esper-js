const Interface = require('./Interface');

class MasterManager extends Interface {
    static extend(instance) {
        instance._masters = [];
        Interface.extend(MasterManager, instance);
    }

    initMasters() {
        let masterFilesElement = this.fileHeader.getElement('Master Files');
        if (!masterFilesElement) return;
        this._masters = masterFileElement._elements.map(masterFileElement => {
            let filename = masterFileElement.getValue('MAST');
            return this.fileManager.getFileByName(filename, true);
        });
    }

    ordinalToFile(ordinal) {
        if (this._masters.length <= ordinal) return this;
        return this._masters[ordinal];
    }

    fileToOrdinal(file) {
        if (this === file) return this._masters.length;
        return this._masters.indexOf(file);
    }

    hasMaster(file) {
        return this._masters.some(m => m.filename === file.filename);
    }

    addMaster(file) {
        if (this.hasMaster(file)) return;
        this._masters.push(file);
    }

    get masters() {
        return this._masters.slice();
    }
}

module.exports = MasterManager;
