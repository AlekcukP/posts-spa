import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../config";

export const useGetUsers = () => {
    const { data: userRecords, error, isLoading } = useQuery({ queryKey: ['users'], queryFn: async () => {
        const res = await axios.get(API_URL + "/users");
        return res.data;
    } });

    return useMemo(
        () => ({ userRecords, error, isLoading }),
        [userRecords, error, isLoading]
    );
};
