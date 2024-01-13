import _ from "lodash";

class Data {
    #data;
    #sortRules;
    #perPage;

    constructor(data = []) {
        this.#data = data;
    }

    static from(data) {
        return new Data(data);
    }

    sortBy(rules = []) {
        this.#sortRules = rules;

        return this;
    }

    paginateBy(perPage = 10) {
        this.#perPage = parseInt(perPage, 10);

        return this;
    }

    get(page = 0) {
        const orderedData = this.#orderData(this.#data);
        const paginatedData = this.#paginateData(orderedData);

        return _.nth(paginatedData, page);
    }

    count() {
        return this.#data.length;
    }

    #orderData(data) {
        if (_.isEmpty(this.#sortRules)) {
            return data;
        }

        return _.orderBy(
            data,
            _.map(this.#sortRules, 'field'),
            _.map(this.#sortRules, 'order')
        );
    }

    #paginateData(data) {
        if (this.#perPage < 1) {
            return [data];
        }

        return _.chunk(data, this.#perPage);
    }
}

export default Data;