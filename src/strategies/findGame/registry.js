const {enumerateValues, HKEY} = require('registry-js');
const {HKEY_LOCAL_MACHINE} = HKEY;
const path = require('path');
const fs = require('fs');

const bethesdaKey = 'Bethesda Softworks';
const steamKey = 'Microsoft\\Windows\\CurrentVersion\\Uninstall\\Steam App';

let getKeys = function(baseKey) {
    return [
        `SOFTWARE\\${baseKey}`,
        `SOFTWARE\\Wow6432Node\\${baseKey}`
    ];
};

let getBethesdaKeys = function(game) {
    return getKeys(`${bethesdaKey}\\${game.registryName}\\Installed Path`);
};

let getSteamKeys = function(game) {
    return game.steamAppIds.reduce((keys, appId) => {
        return keys.concat(getKeys(`${steamKey}\\${appId}\\InstallLocation`));
    }, []);
};

let getRegistryKeys = function(game) {
    return Array.prototype.concat(
        getBethesdaKeys(game),
        getSteamKeys(game)
    );
};

let resolveRegistryValue = function(hKey, fullPath) {
    let dir = path.dirname(fullPath),
        key = path.basename(fullPath),
        values = enumerateValues(HKEY_LOCAL_MACHINE, dir);
    return values && values[key];
};

module.exports = {
    find: function(game) {
        let keys = getRegistryKeys(game);
        for (let i = 0; i < keys.length; i++) {
            let value = resolveRegistryValue(keys[i]);
            if (value && fs.existsSync(value)) return value;
        }
    }
};
