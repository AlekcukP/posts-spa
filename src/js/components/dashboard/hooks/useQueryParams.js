import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = (filterableFields) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateFilterSearchParams = filterModel => {
        _.each(filterableFields, key => searchParams.delete(key));

        if (filterModel?.items?.length) {
            const { field, value } = _.first(filterModel.items);

            value && searchParams.set(field, value);
        }

        setSearchParams(searchParams.toString());

        return filterModel;
    }

    const updateSortSearchParams = sortModel => {
        _.each(['field', 'sort'], key => searchParams.delete(key));

        if (!_.isEmpty(sortModel)) {
            const { field, sort } = _.first(sortModel);

            if (field && sort) {
                searchParams.set('field', field);
                searchParams.set('sort', sort);
            }
        }

        setSearchParams(searchParams.toString());

        return sortModel;
    }

    const updatePaginationSearchParams = ({ page, pageSize }) => {
        _.each(['page', 'pageSize'], key => searchParams.delete(key));

        if (_.isInteger(page) && _.isInteger(pageSize)) {
            searchParams.set('page', page);
            searchParams.set('pageSize', pageSize);
        };

        setSearchParams(searchParams.toString());

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
