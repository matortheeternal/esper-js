let ffp = require('file-format-parser');

ffp.addDataFormat('PluginRecord', [{
    type: 'signature',
    storageKey: 'signature'
}, {
    type: 'uint32',
    storageKey: 'dataSize'
}, {
    type: 'uint32',
    storageKey: 'flags'
}, {
    type: 'uint32',
    storageKey: 'id'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'versionControlInfo1'
}, {
    type: 'uint16',
    storageKey: 'version'
}, {
    type: 'buffer',
    size: 2,
    storageKey: 'versionControlInfo2'
}, {
    type: 'buffer',
    sizeKey: 'dataSize',
    storageKey: 'data'
}]);

ffp.addDataFormat('PluginGroup', [{
    type: 'signature',
    expectedValue: 'GRUP',
    errorMessage: 'Expected top-level GRUP plugin group.',
    storageKey: 'signature'
}, {
    type: 'uint32',
    storageKey: 'groupSize'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'label'
}, {
    type: 'int32',
    storageKey: 'groupType'
}, {
    type: 'buffer',
    size: 4,
    storageKey: 'versionControlInfo'
}, {
    type: 'uint32',
    storageKey: 'unknown'
}, {
    type: 'buffer',
    sizeKey: 'groupSize',
    sizeOffset: -24,
    storageKey: 'data'
}]);

ffp.addDataFormat('PluginFile', [{
    type: 'record',
    format: 'PluginRecord',
    expectedValues: {
        signature: 'TES4'
    },
    errorMessage: 'Plugin header not found.',
    storageKey: 'header'
}, {
    type: 'collection',
    entry: {
        type: 'record',
        format: 'PluginGroup',
        expectedValues: {
            groupType: 0
        },
        errorMessage: 'Group is not top-level.'
    },
    storageKey: 'groups'
}]);

ffp.addDataFormat('GroupData', [{
    type: 'unionCollection',
    switchEntity: {
        type: 'signature',
        storageKey: 'signature'
    },
    cases: {
        GRUP: 'PluginGroup'
    },
    defaultCase: 'PluginRecord',
    storageKey: 'records'
}]);
