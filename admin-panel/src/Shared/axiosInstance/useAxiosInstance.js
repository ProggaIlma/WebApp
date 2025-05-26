//axiosInstance
import axios from 'axios'
import { useContext } from 'react'
import { baseURL } from "@Shared/APIUrls";
import { AuthContext } from '@Shared/AuthContexts/auth-context';
export const useAxiosInstance = () => {
    const auth = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${auth.token}` }
    });

    return { axiosInstance };
}