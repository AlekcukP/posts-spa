import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import URL from "../../helpers/url";

export const useGetUsers = () => {
    const { data: userRecords, error, isLoading } = useQuery({ queryKey: ['users'], queryFn: async () => {
        const res = await axios.get(URL.resolve(API_URL, 'users'));
        return res.data;
    } });

    return useMemo(
        () => ({ userRecords, error, isLoading }),
        [userRecords, error, isLoading]
    );
};
