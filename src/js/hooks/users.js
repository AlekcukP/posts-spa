import { useQuery } from "react-query";
import axios from "axios";

export const useGetUsers = () => {
    const getUsers = async () => {
        const res = await axios.get("/api/users");
        return res.data;
    };

    return useQuery({ queryKey: ['users'], queryFn: getUsers });
};
