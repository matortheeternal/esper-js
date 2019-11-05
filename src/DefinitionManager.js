const fs = require('fs');
const path = require('path');

class DefinitionManager {
    constructor() {
        this.defClasses = {};
        this.loadDefClasses();
    }

    loadDefinitions(game) {
        let filePath = path.resolve(__dirname, 'defs', `${game}.json`);
        this.defs = fs.readFileSync(filePath);
    }

    resolveDef(key) {
        let value = this.defs[key];
        if (!value) throw new Error(`Failed to resolve def: ${key}`);
        return value;
    }

    loadDefClasses() {
        let defsPath = path.resolve('./src/defs'),
            files = fs.readdirSync(defsPath);
        files.forEach(filename => {
            let filePath = `${defsPath}/${filename}`,
                DefClass = require(filePath),
                key = DefClass.defType;
            if (!key) return;
            this.defClasses[key] = DefClass;
        });
    }

    resolveDefClass(key) {
        let value = this.defClasses[key];
        if (!value) throw new Error(`Failed to resolve def class: ${key}`);
        return value;
    }

    buildDef(def) {
        let defId = def.def;
        if (defId) def = Object.assign({}, this.resolveDef(defId), def);
        let DefClass = this.resolveDefClass(def.type);
        return new DefClass(def);
    }

    buildDefs(defs) {
        return defs.map(def => this.buildDef(def));
    }
}

module.exports = new DefinitionManager();
