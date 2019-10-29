let ffp = require('file-format-parser');

ffp.addDataType('signature', {
    read: stream => stream.read(4).toString('ascii')
});

ffp.addDataType('buffer', {
    read: (stream, entity, store) => {
        let size = entity.hasOwnProperty('sizeKey') ?
            store[entity.sizeKey] :
            entity.size || 0;
        if (entity.hasOwnProperty('sizeOffset')) size += entity.sizeOffset;
        return stream.read(size);
    }
});

ffp.addDataType('collection', {
    read: (stream, entity) => {
        let entryType = ffp.resolveEntityType(entity.entry),
            entries = [];
        while (stream.getRemainingBytes() > 0)
            entries.push(entryType.read(stream, entity.entry));
        return entries;
    }
});

ffp.addDataType('unionCollection', {
    read: (stream, entity) => {
        let entries = [];
        while(stream.getRemainingBytes() > 0) {
            let entry = {};
            ffp.parseEntity(stream, entity.switchEntity, entry);
            let switchValue = entry[entity.switchEntity.storageKey],
                caseFormat = entity.cases[switchValue] || entity.defaultCase,
                schema = ffp.resolveEntityFormat(caseFormat).slice(1);
            ffp.parseSchema(stream, schema, entry);
            entries.push(entry);
        }
        return entries;
    }
});
