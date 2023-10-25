import { useQuery } from "react-query";
import axios from "axios";

export const useGetPosts = () => {
    const fetchPosts = async () => {
        const res = await axios.get("/api/posts");
        return res.data;
    };

    return useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
};
