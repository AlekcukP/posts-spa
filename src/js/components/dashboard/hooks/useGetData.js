import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import URL from "../../../helpers/url";

export const useGetData = (path) => {
    const { data, error, isLoading } = useQuery({ queryKey: [path], queryFn: async () => {
        const res = await axios.get(URL.resolve(API_URL, path));
        return res.data;
    } });

    return useMemo(
        () => ({ data, error, isLoading }),
        [data, error, isLoading]
    );
};
