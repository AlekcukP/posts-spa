import { useReducer } from "react";
import _ from "lodash";
import reducer from "../utils/reducer";
import { usePipe } from "../../../hooks/usePipe";
import FilterHelper from "../../../../../helpers/filter";
import SortHelper from "../../../../../helpers/sort";

export const useGridControls = (initialState, rows, onFilterModelChange, onSortModelChange, onPaginationModelChange) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const pipe = usePipe();

    const handleSortModelChange = pipe(
        onSortModelChange,
        (sortModel) => dispatch({type: 'sort_model_change', sortModel})
    );

    const handlePageChange = pipe(
        (e, page) => ({ page, pageSize: state.pagination.paginationModel.pageSize }),
        onPaginationModelChange,
        paginationModel => dispatch({ type: 'pagination_model_change', paginationModel })
    );

    const handlePageSizeChange = pipe(
        ({ target: { value } }) => ({ page: 0, pageSize: parseInt(value, 10) }),
        onPaginationModelChange,
        paginationModel => dispatch({ type: 'pagination_model_change', paginationModel })
    );

    const handleFilterModelChange = pipe(
        (filterModelItem) => ({ items: [filterModelItem] }),
        onFilterModelChange,
        (filterModel) => dispatch({type: 'filter_model_change', filterModel})
    );

    const filterModel = !_.isEmpty(state.filter.filterModel.items) ? _.first(state.filter.filterModel.items) : {};
    const sortModel = !_.isEmpty(state.sorting.sortModel) ? _.first(state.sorting.sortModel) : {};
    const paginationModel = { ...state.pagination.paginationModel };

    const processRows = pipe(
        rows => FilterHelper.filter(rows, filterModel),
        rows => SortHelper.sort(rows, sortModel),
        rows => SortHelper.paginate(rows, paginationModel.pageSize),
        rows => SortHelper.getPage(rows, paginationModel.page)
    );

    const refinedRows = processRows(rows);

    return {
        refinedRows,
        filterModel,
        sortModel,
        paginationModel,
        handleSortModelChange,
        handlePageChange,
        handlePageSizeChange,
        handleFilterModelChange
    };
};

