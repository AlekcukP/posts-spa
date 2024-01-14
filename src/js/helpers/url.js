import _ from "lodash";

class URL {
    static #replace(str) {
        return _.replace(str, /^\/+|\/+$/g, '');
    }

    static resolve(baseUrl, ...parts) {
        if (_.some(parts, part => !_.isString(part)) || !_.isString(baseUrl)) {
            throw new Error('All parts must be strings');
        }

        let base = URL.#replace(baseUrl);

        if (!_.startsWith(base, 'http')) {
            base = `/${base}`;
        }

        return _.join([
            base,
            ..._.map(parts, part => URL.#replace(part))
        ], '/');
    }
}

export default URL;
