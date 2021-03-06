const Session = require('../../src/setup/Session');

describe('Session', () => {
    describe('constructor', () => {
        let session;

        it('should be defined', () => {
            expect(Session).toBeDefined();
        });

        it('should create a new instance', () => {
            session = new Session('TES5');
            expect(session).toBeInstanceOf(Session);
        });

        it('should initialize a definitionManager', () => {
            expect(session.definitionManager).toBeDefined();
        });

        it('should initialize a pluginManager', () => {
            expect(session.pluginManager).toBeDefined();
        });
    })
});
