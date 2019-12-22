let tintLayers = {};

let cacheTintName = function(tints, element) {
    let textureElement = element.getData('Tint Layer\\Texture'),
        index = textureElement.getData('TINI'),
        tinp = textureElement.getData('TINP'),
        textureName = textureElement.getData('TINT');
    tints[index] = tinp ? `[${tinp}] ${textureName}` : textureName;
};

let cacheTintNames = function(raceRecord, genderKey) {
    let tints = {},
        tintMasksPath = `Head Data\\${genderKey} Head Data\\Tint Masks`,
        tintMasks = raceRecord.getElement(tintMasksPath);
    if (!tintMasks) return tints;
    tintMasks.elements.forEach(element => cacheTintName(tints, element));
    return tints;
};

let cacheRace = function(raceRecord, raceId) {
    tintLayers[raceId] = {
        Male: cacheTintNames(raceRecord, 'Male'),
        Female: cacheTintNames(raceRecord, 'Female')
    };
};

let getTintLayerName = function(raceRecord, female, index) {
    let raceId = raceRecord.getValue('EditorID');
    if (!tintLayers[raceId]) cacheRace(raceRecord, raceId);
    let genderKey = female ? 'Female' : 'Male';
    return tintLayers[raceId][genderKey][index] ||
        `<Tint layer index not found in ${raceId}>`;
};

module.exports = {getTintLayerName};
