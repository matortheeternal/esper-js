const pluginsTxtParsers = require('../../src/setup/pluginsTxtParsers');

describe('pluginsTxtParsers', () => {
    it('should be defined', () => {
        expect(pluginsTxtParsers).toBeDefined();
    });

    describe('asterisk parser', () => {
        let asteriskParser = pluginsTxtParsers.asterisk;

        it('should be defined', () => {
            expect(asteriskParser).toBeDefined();
        });

        describe('parse', () => {
            let plugins;

            beforeAll(() => {
                plugins = asteriskParser.parse([
                    '# comment',
                    '',
                    '   ',
                    '*file.esp',
                    'disabledFile.esp'
                ].join('\r\n'));
            });

            it('should remove comment lines and blank lines', () => {
                expect(plugins).toBeDefined();
                expect(plugins.length).toBe(2);
            });

            it('should set enabled based on asterisk presence', () => {
                expect(plugins[0].enabled).toBe(true);
                expect(plugins[1].enabled).toBe(false);
            });

            it('should set filename correctly', () => {
                expect(plugins[0].filename).toBe('file.esp');
                expect(plugins[1].filename).toBe('disabledFile.esp');
            });
        });
    });

    describe('plain parser', () => {
        let plainParser = pluginsTxtParsers.plain;

        it('should be defined', () => {
            expect(plainParser).toBeDefined();
        });

        describe('parse', () => {
            let plugins;

            beforeAll(() => {
                plugins = plainParser.parse([
                    '# comment',
                    '',
                    '   ',
                    'file.esp'
                ].join('\r\n'));
            });

            it('should remove comment lines and blank lines', () => {
                expect(plugins).toBeDefined();
                expect(plugins.length).toBe(1);
            });

            it('should set enabled and filename', () => {
                expect(plugins[0].enabled).toBe(true);
                expect(plugins[0].filename).toBe('file.esp');
            });
        });
    });
});
