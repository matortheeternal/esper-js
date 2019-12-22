class ValidatedObject {
    constructor(params) {
        this.constructor.check(params);
        Object.assign(this, params);
        this.applyDefaults();
    }

    applyDefaults() {
        let defaults = this.defaults;
        Object.keys(defaults).forEach(key => {
            if (this.hasOwnProperty(key)) return;
            this[key] = defaults[key]();
        });
    }
}

module.exports = ValidatedObject;
