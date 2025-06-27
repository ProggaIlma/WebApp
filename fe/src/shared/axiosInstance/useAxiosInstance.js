//axiosInstance
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from "src/Shared/AuthContexts/auth-context";
import { baseURL } from "src/Shared/APIUrls";

export const useAxiosInstance = () => {
    const auth = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${auth.token}` }
    });

    return {axiosInstance};
}