import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams.entries());

    const updateSearchParams = params => setSearchParams(new URLSearchParams(params));
    const omitSearchParams = keys => updateSearchParams(_.omit(searchParamsObj, keys));
    const mergeSearchParams = params => updateSearchParams({ ...searchParamsObj, ...params });

    const memoValues =  useMemo(
        () => ({ searchParams }),
        [searchParams]
    );

    return { ...memoValues, omitSearchParams, mergeSearchParams };
}
