import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../appConfig";

export const useGetPosts = () => {
    const { data: postRecords, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: async () => {
        const res = await axios.get(API_URL + "/posts");
        return res.data;
    } });

    return useMemo(
        () => ({ postRecords, error, isLoading }),
        [postRecords, error, isLoading ]
    );
};
