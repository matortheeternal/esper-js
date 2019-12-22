const Game = require('./Game');

let plugin = (filename) => ({ filename });

module.exports = [
    new Game({
        xeditId: 1,
        name: 'Oblivion',
        fullName: 'The Elder Scrolls IV: Oblivion',
        abbreviation: 'TES4',
        steamAppIds: [22330, 900883]
    }),
    new Game({
        xeditId: 2,
        name: 'Fallout 3',
        baseName: 'Fallout3',
        abbreviation: 'FO3',
        iniFileName: 'Fallout.ini',
        steamAppIds: [22300, 22370]
    }),
    new Game({
        xeditId: 3,
        name: 'Fallout NV',
        baseName: 'FalloutNV',
        fullName: 'Fallout: New Vegas',
        abbreviation: 'FNV',
        iniFileName: 'Fallout.ini',
        steamAppIds: [22380, 2028016]
    }),
    new Game({
        xeditId: 4,
        name: 'Skyrim',
        fullName: 'The Elder Scrolls V: Skyrim',
        exeName: 'TESV.exe',
        abbreviation: 'TES5',
        hardcodedPlugins: [
            plugin('Skyrim.esm'),
            plugin('Update.esm')
        ],
        steamAppIds: [72850]
    }),
    new Game({
        xeditId: 6,
        name: 'Fallout 4',
        baseName: 'Fallout4',
        abbreviation: 'FO4',
        ccFileName: 'Fallout4.ccc',
        archiveExtension: '.ba2',
        pluginsTxtType: 'asterisk',
        pluginExtensions: ['.esp', '.esm', '.esl'],
        hardcodedPlugins: [
            plugin('Fallout4.esm'),
            plugin('DLCRobot.esm'),
            plugin('DLCworkshop01.esm'),
            plugin('DLCCoast.esm'),
            plugin('DLCworkshop02.esm'),
            plugin('DLCworkshop03.esm'),
            plugin('DLCNukaWorld.esm'),
            plugin('DLCUltraHighResolution.esm')
        ],
        steamAppIds: [377160]
    }),
    new Game({
        xeditId: 7,
        name: 'Skyrim SE',
        baseName: 'SkyrimSE',
        fullName: 'Skyrim: Special Edition',
        abbreviation: 'SSE',
        regName: 'Skyrim Special Edition',
        esmName: 'Skyrim.esm',
        ccFileName: 'Skyrim.ccc',
        pluginsTxtType: 'asterisk',
        pluginExtensions: ['.esp', '.esm', '.esl'],
        hardcodedPlugins: [
            plugin('Skyrim.esm'),
            plugin('Update.esm'),
            plugin('Dawnguard.esm'),
            plugin('HearthFires.esm'),
            plugin('Dragonborn.esm')
        ],
        steamAppIds: [489830]
    })
].reduce((obj, game) => {
    obj[game.abbreviation] = game;
    return obj;
}, {});
