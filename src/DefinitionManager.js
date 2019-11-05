const fs = require('fs');
const path = require('path');

let loadDefClasses = function() {
    let defsPath = path.resolve('./src/defs'),
        files = fs.readdirSync(defsPath);
    return files.reduce((defClasses, filename) => {
        let filePath = `${defsPath}/${filename}`,
            DefClass = require(filePath),
            key = DefClass.defType;
        if (key) defClasses[key] = DefClass;
        return defClasses;
    }, {});
};

let loadDefinitions = function(game) {
    let filePath = path.resolve(`./defs/${game}.json`);
    if (!fs.existsSync(filePath))
        throw new Error(`Couldn't find definitions for game ${game}.`);
    return JSON.parse(fs.readFileSync(filePath));
};

let buildRecordDefs = function(manager) {
    return Object.keys(manager.defs).reduce((recordDefs, id) => {
        let def = manager.defs[id];
        if (def.type === 'record' && def.signature)
            recordDefs[id] = manager.buildDef(def);
        return recordDefs;
    }, {});
};

class DefinitionManager {
    constructor(game) {
        this.defClasses = loadDefClasses();
        this.defs = loadDefinitions(game);
        this.recordDefs = buildRecordDefs(this);
    }

    resolveDef(key) {
        let value = this.defs[key];
        if (!value) throw new Error(`Failed to resolve def: ${key}`);
        return value;
    }

    resolveDefClass(key) {
        let value = this.defClasses[key];
        if (!value) throw new Error(`Failed to resolve def class: ${key}`);
        return value;
    }

    buildDef(def, parent) {
        let id = def.id;
        if (id) def = Object.assign({}, this.resolveDef(id), def);
        let DefClass = this.resolveDefClass(def.type);
        return new DefClass(this, def, parent);
    }

    buildDefs(defs, parent) {
        return defs.map(def => this.buildDef(def, parent));
    }
}

module.exports = DefinitionManager;
