import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { API_URL } from "../../config";

export const useGetAlbums = () => {
    const { data: albumRecords, error, isLoading } = useQuery({ queryKey: ['albums'], queryFn: async () => {
        const res = await axios.get(API_URL + '/albums');
        return res.data;
    }});

    return useMemo(
        () => ({ albumRecords, error, isLoading }),
        [albumRecords, error, isLoading ]
    );
};
