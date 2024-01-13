import _ from "lodash";

export default function reducer(state, action) {
    switch (action.type) {
        case 'sort_change': {
            const sortRules = _.merge(state.sorting.sortModel, action.sortModel);
            const sortModel = _.filter(sortRules, (obj) => _.some(obj, (value) => !_.isNil(value)));

            return {
                ...state,
                sorting: { sortModel }
            };
        };

        case 'page_change': {
            return {
                ...state,
                pagination: { ...action.paginationModel },
            };
        }

        case 'page_size_change': {
            return {
                ...state,
                pagination: { ...action.paginationModel },
            };
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }
}
