import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const useGetPosts = () => {
    const [searchParams] = useSearchParams();

    const getPosts = async () => {
        const res = await axios.get("/api/posts", { params: searchParams });
        return res.data;
    };

    return useQuery({ queryKey: ['posts'], queryFn: getPosts });
};
