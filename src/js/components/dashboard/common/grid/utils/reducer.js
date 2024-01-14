import _ from "lodash";

export default function reducer(state, action) {
    switch (action.type) {
        case 'sort_model_change': {
            return {
                ...state,
                sorting: { sortModel: [...action.sortModel] }
            };
        };

        case 'pagination_model_change': {
            return {
                ...state,
                pagination: { paginationModel: { ...action.paginationModel } },
            };
        }

        default:
            throw Error('Unknown action: ' + action.type);
    }
}
