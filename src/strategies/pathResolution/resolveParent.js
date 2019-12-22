module.exports = {
    priority: 15,
    match: pathPart => pathPart === '..',
    resolve: element => element.container
};
