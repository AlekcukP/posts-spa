import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import URL from "../helpers/url";

export const useGetPosts = () => {
    const { data: postRecords, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: async () => {
        const res = await axios.get(URL.resolve(API_URL, 'posts'));
        return res.data;
    } });

    return useMemo(
        () => ({ postRecords, error, isLoading }),
        [postRecords, error, isLoading ]
    );
};
