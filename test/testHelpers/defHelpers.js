let subrecord = (signature, element) => ({signature, ...element});
let uint32 = (name) => ({name, type: 'uint32'});
let float = (name) => ({name, type: 'float'});
let string = (name) => ({name, type: 'string'});
let flags = (flags) => ({flags, type: 'flags'});

module.exports = {
    subrecord, uint32, float, string, flags
};
