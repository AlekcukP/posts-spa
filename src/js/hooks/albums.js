import { useQuery } from "react-query";
import axios from "axios";

export const useGetAlbums = () => {
    const fetchAlbums = async () => {
        const res = await axios.get("/api/albums");
        return res.data;
    };

    return useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });
};
