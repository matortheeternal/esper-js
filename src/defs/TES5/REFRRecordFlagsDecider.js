const signatureMap = {
    ACTI: 1, STAT: 1, TREE: 1,
    CONT: 2,
    DOOR: 3,
    LIGH: 4,
    MSTT: 5,
    ADDN: 6,
    SCRL: 7, AMMO: 7, ARMO: 7, BOOK: 7, INGR: 7,
    KEYM: 7, MISC: 7, SLGM: 7, WEAP: 7, ALCH: 7
};

module.exports = function REFRRecordFlagsDecider(element) {
    if (!element || !element.record) return 0;
    let refRec = element.record.getElement('NAME\\@');
    if (!refRec) return 0;
    return signatureMap[refRec.signature] || 0;
};
