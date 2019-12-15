class Interface {
    constructor() {
        throw new Error('Interfaces cannot be constructed.');
    }

    static getPrototypeProps(source) {
        return Object.getOwnPropertyNames(source.prototype).slice(1);
    };

    static extend(source, instance) {
        Interface.getPrototypeProps(source).forEach(prop => {
            let descriptor = Object.getOwnPropertyDescriptor(source, prop);
            Object.defineProperty(instance, prop, descriptor);
        });
    }
}

module.exports = Interface;
