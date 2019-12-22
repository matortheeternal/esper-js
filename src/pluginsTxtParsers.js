let parseAsteriskLine = line => {
    let enabled = line.startsWith('*'),
        filename = enabled ? line.slice(1) : line;
    return { enabled, filename };
};

let parsePlainLine = line => ({
    enabled: true,
    filename: line,
});

let notCommentOrEmpty = line => {
    return line[0] !== ' ' && line[0] !== '#';
};

let asteriskParser = {
    parse: function(pluginsText) {
        return pluginsText.split('\r\n')
            .filter(notCommentOrEmpty)
            .map(parseAsteriskLine);
    }
};

let plainParser = {
    parse: function(pluginsText) {
        return pluginsText.split('\r\n')
            .filter(notCommentOrEmpty)
            .map(parsePlainLine);
    }
};

module.exports = {
    asterisk: asteriskParser,
    plain: plainParser
};
