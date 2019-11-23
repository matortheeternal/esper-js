const Element = require('../../src/elements/Element');

describe('Element', () => {
    describe('constructor', () => {
        let element;

        it('should be defined', () => {
            expect(Element).toBeDefined();
        });

        it('should instantiate a new element', () => {
            element = new Element();
            expect(element).toBeDefined();
            expect(element).toBeInstanceOf(Element);
        });

        it('should not set container, def, or file', () => {
            expect(element.def).toBeUndefined();
            expect(element.container).toBeUndefined();
            expect(element.file).toBeUndefined();
        });

        describe('def passed', () => {
            it('should set def', () => {
                let def = {},
                    element = new Element(null, def);
                expect(element).toBeDefined();
                expect(element.def).toBeDefined();
                expect(element.def).toBe(def);
            });
        });

        describe('container passed', () => {
            let element;
            let container = {
                file: {},
                elementAdded: jest.fn()
            };

            it('should set container', () => {
                element = new Element(container);
                expect(element.container).toBeDefined();
                expect(element.container).toBe(container);
            });

            it('should set file', () => {
                expect(element.file).toBeDefined();
                expect(element.file).toBe(container.file);
            });

            it('should call container.elementAdded', () => {
                expect(container.elementAdded).toHaveBeenCalledTimes(1);
                expect(container.elementAdded).toBeCalledWith(element);
            });
        });
    });

    describe('instance methods', () => {
        let element;

        beforeAll(() => {
            element = new Element(null, {name: 'Test'});
        });

        describe('name', () => {
            it('should return def name', () => {
                expect(element.name).toBe('Test');
            });
        });

        describe('path', () => {
            // TODO
        });
    });
});
