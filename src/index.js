// lilopa.js

class Lilopa {
    constructor(options) {
        this.options = options;
    }

    parse(args) {
        const parsedOptions = {};

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg.startsWith("--")) {
                const [key, value] = arg.substring(2).split("=");
                parsedOptions[key] = value || true;
            } else if (arg.startsWith("-")) {
                const [key, value] = arg.substring(1).split("=");
                parsedOptions[key] = value || true;
            }
        }

        return parsedOptions;
    }

    analyze(parsedOptions) {
        const result = {};

        for (const option of this.options) {
            const { name, aliases, description } = option;
            let value = null;

            for (const key of [...aliases, name]) {
                if (parsedOptions.hasOwnProperty(key)) {
                    value = parsedOptions[key];
                    break;
                }
            }

            result[name] = value;
        }

        return result;
    }
}

module.exports = Lilopa;
