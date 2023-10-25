import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const useGetAlbums = () => {
    const [searchParams] = useSearchParams();

    const getAlbums = async () => {
        const res = await axios.get("/api/albums", { params: searchParams });
        return res.data;
    };

    return useQuery({ queryKey: ['albums'], queryFn: getAlbums });
};
