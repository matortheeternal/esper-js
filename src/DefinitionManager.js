const fs = require('fs');
const path = require('path');

let loadDefClasses = function(defsPath, keyStr) {
    if (!fs.existsSync(defsPath)) return;
    return fs.readdirSync(defsPath).reduce((defClasses, filename) => {
        let defClassPath = path.join(basePath, filename);
        if (fs.lstatSync(defClassPath).isDirectory()) return;
        let DefClass = require(defClassPath),
            key = DefClass[keyStr];
        if (key) defClasses[key] = DefClass;
        return defClasses;
    }, {});
};

let getDefClasses = function(game) {
    return Object.assign(
        loadDefClasses(path.resolve('./src/defs'), 'defType'),
        loadDefClasses(path.resolve(`./src/defs/${game}`), 'name')
    );
};

let loadDefinitions = function(game) {
    let filePath = path.resolve(`./defs/${game}.json`);
    if (!fs.existsSync(filePath))
        throw new Error(`Couldn't find definitions for game ${game}.`);
    return JSON.parse(fs.readFileSync(filePath));
};

let buildRecordDefs = function(manager) {
    return Object.keys(manager._defs).reduce((recordDefs, id) => {
        let def = manager._defs[id];
        if (def.type === 'record' && def.signature)
            recordDefs[id] = manager.buildDef(def);
        return recordDefs;
    }, {});
};

class DefinitionManager {
    constructor(game) {
        this._defClasses = getDefClasses(game);
        this._defs = loadDefinitions(game);
        this._recordDefs = buildRecordDefs(this);
    }

    resolveDef(id) {
        let value = this._defs[id];
        if (!value) throw new Error(`Failed to resolve def: ${id}`);
        return value;
    }

    resolveDefClass(defType) {
        let value = this._defClasses[defType];
        if (!value) throw new Error(`Failed to resolve def class: ${defType}`);
        return value;
    }

    resolveRecordDef(id) {
        let value = this._recordDefs[id];
        if (!value) throw new Error(`Failed to resolve record def: ${id}`);
        return value;
    }

    buildDef(def, parent) {
        let id = def.id;
        if (id) def = Object.assign({}, this.resolveDef(id), def);
        let DefClass = this.resolveDefClass(def.type);
        return new DefClass(this, def, parent);
    }

    buildDefs(defs, parent) {
        return defs.map((def, sortOrder) => {
            let builtDef = this.buildDef(def, parent);
            builtDef.sortOrder = sortOrder;
            return builtDef;
        });
    }
}

module.exports = DefinitionManager;
