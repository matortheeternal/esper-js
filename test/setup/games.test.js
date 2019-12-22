const games = require('../../src/setup/games');

describe('games', () => {
    it('should be defined', () => {
        expect(games).toBeDefined()
    });

    ['TES4', 'FO3', 'FNV', 'TES5', 'FO4', 'SSE'].forEach(game => {
        describe(game, () => {
            it('should be defined', () => {
                expect(games[game]).toBeDefined();
            });
        });
    });
});
