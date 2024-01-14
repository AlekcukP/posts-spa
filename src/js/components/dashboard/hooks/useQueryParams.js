import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams.entries());

    const updateSearchParams = params => setSearchParams(new URLSearchParams(params));
    const omitSearchParams = keys => updateSearchParams(_.omit(searchParamsObj, keys));
    const mergeSearchParams = params => updateSearchParams({ ...searchParamsObj, ...params });

    const updateFilterSearchParams = filterModel => {
        omitSearchParams(columns.getFilterableFields());

        if (filterModel?.items?.length) {
            const { field, value } = _.first(filterModel.items);

            mergeSearchParams(
                field && value ? { [field]: value } : {}
            );
        }

        return filterModel;
    }

    const updateSortSearchParams = sortModel => {
        omitSearchParams(['field', 'sort']);

        if (!_.isEmpty(sortModel)) {
            const { field, sort } = _.first(sortModel);

            mergeSearchParams(
                field && sort ? { field, sort } : {}
            );
        }

        return sortModel;
    }

    const updatePaginationSearchParams = ({ page, pageSize }) => {
        omitSearchParams(['page', 'pageSize']);

        if (_.isInteger(page) && _.isInteger(pageSize)) mergeSearchParams({ page, pageSize });

        return { page, pageSize };
    }

    const memoValues =  useMemo(
        () => ({ searchParams }),
        [searchParams]
    );

    return {
        ...memoValues,
        updateFilterSearchParams,
        updatePaginationSearchParams,
        updateSortSearchParams
    };
}
