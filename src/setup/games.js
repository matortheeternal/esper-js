const Game = require('./Game');

module.exports = [
    new Game({
        xeditId: 1,
        name: 'Oblivion',
        baseName: 'Oblivion',
        fullName: 'The Elder Scrolls IV: Oblivion',
        abbreviation: 'TES4',
        registryName: 'Oblivion',
        myGamesFolderName: 'Oblivion',
        appDataFolderName: 'Oblivion',
        exeName: 'Oblivion.exe',
        esmName: 'Oblivion.esm',
        iniName: 'Oblivion.ini',
        cccName: undefined,
        pluginsTxtType: 'plain',
        archiveExtension: '.bsa',
        pluginExtensions: ['.esp', '.esm'],
        hardcodedPlugins: [
            {filename: 'Oblivion.esm'}
        ],
        steamAppIds: [22330, 900883]
    }),
    new Game({
        xeditId: 2,
        name: 'Fallout 3',
        baseName: 'Fallout3',
        fullName: 'Fallout 3',
        abbreviation: 'TES5',
        registryName: 'Fallout 3',
        myGamesFolderName: 'Fallout 3',
        appDataFolderName: 'Fallout 3',
        exeName: 'Fallout3.exe',
        esmName: 'Fallout3.esm',
        iniName: 'Fallout.ini',
        cccName: undefined,
        pluginsTxtType: 'plain',
        archiveExtension: '.bsa',
        pluginExtensions: ['.esp', '.esm'],
        hardcodedPlugins: [
            {filename: 'Fallout3.esm'}
        ],
        steamAppIds: [22300, 22370]
    }),
    new Game({
        xeditId: 2,
        name: 'Fallout NV',
        baseName: 'FalloutNV',
        fullName: 'Fallout: New Vegas',
        abbreviation: 'FNV',
        registryName: 'Fallout New Vegas',
        myGamesFolderName: 'FalloutNV',
        appDataFolderName: 'FalloutNV',
        exeName: 'FalloutNV.exe',
        esmName: 'FalloutNV.esm',
        iniName: 'Fallout.ini',
        cccName: undefined,
        pluginsTxtType: 'plain',
        archiveExtension: '.bsa',
        pluginExtensions: ['.esp', '.esm'],
        hardcodedPlugins: [
            {filename: 'FalloutNV.esm'}
        ],
        steamAppIds: [22380, 2028016]
    }),
    new Game({
        xeditId: 4,
        name: 'Skyrim',
        baseName: 'Skyrim',
        fullName: 'The Elder Scrolls V: Skyrim',
        abbreviation: 'TES5',
        registryName: 'Skyrim',
        myGamesFolderName: 'Skyrim',
        appDataFolderName: 'Skyrim',
        exeName: 'TESV.exe',
        esmName: 'Skyrim.esm',
        iniName: 'Skyrim.ini',
        cccName: undefined,
        pluginsTxtType: 'plain',
        archiveExtension: '.bsa',
        pluginExtensions: ['.esp', '.esm'],
        hardcodedPlugins: [
            {filename: 'Skyrim.esm'},
            {filename: 'Update.esm'}
        ],
        steamAppIds: [72850]
    }),
    new Game({
        xeditId: 6,
        name: 'Fallout 4',
        baseName: 'Fallout4',
        fullName: 'Fallout 4',
        abbreviation: 'FO4',
        registryName: 'Fallout4',
        myGamesFolderName: 'Fallout4',
        appDataFolderName: 'Fallout4',
        exeName: 'Fallout4.exe',
        esmName: 'Fallout4.esm',
        iniName: 'Fallout4.ini',
        cccName: 'Fallout4.ccc',
        pluginsTxtType: 'asterisk',
        archiveExtension: '.ba2',
        pluginExtensions: ['.esp', '.esm', '.esl'],
        hardcodedPlugins: [
            {filename: 'Fallout4.esm'},
            {filename: 'DLCRobot.esm'},
            {filename: 'DLCworkshop01.esm'},
            {filename: 'DLCCoast.esm'},
            {filename: 'DLCworkshop02.esm'},
            {filename: 'DLCworkshop03.esm'},
            {filename: 'DLCNukaWorld.esm'},
            {filename: 'DLCUltraHighResolution.esm'}
        ],
        steamAppIds: [377160]
    }),
    new Game({
        xeditId: 7,
        name: 'Skyrim SE',
        baseName: 'SkyrimSE',
        fullName: 'Skyrim: Special Edition',
        abbreviation: 'SSE',
        registryName: 'Skyrim Special Edition',
        myGamesFolderName: 'Skyrim Special Edition',
        appDataFolderName: 'Skyrim Special Edition',
        exeName: 'SkyrimSE.exe',
        esmName: 'Skyrim.esm',
        iniName: 'Skyrim.ini',
        cccName: 'Skyrim.ccc',
        pluginsTxtType: 'asterisk',
        archiveExtension: '.bsa',
        pluginExtensions: ['.esp', '.esm', '.esl'],
        hardcodedPlugins: [
            {filename: 'Skyrim.esm'},
            {filename: 'Update.esm'},
            {filename: 'Dawnguard.esm'},
            {filename: 'HeathFires.esm'},
            {filename: 'Dragonborn.esm'}
        ],
        steamAppIds: [377160]
    })
].reduce((obj, game) => {
    obj[game.abbreviation] = game;
    return obj;
}, {});
