const referenceExpr = /^@([WK])?$/;

module.exports = {
    priority: 15,
    match: pathPart => pathPart.match(referenceExpr),
    resolve: (element, match) => {
        let rec = element.referencedRecord;
        if (match[1] === 'W') rec = rec.winningOverride;
        if (match[1] === 'K') rec = rec.knownOverride(element.file);
        return rec;
    }
};
