import _ from 'lodash';

class Collection {
    #data;

    constructor (data) {
        this.#data = Immutable.List(_.map(data, item => Immutable.Map(item)));
        console.log(this.#data)
    }
}

export default Collection;
