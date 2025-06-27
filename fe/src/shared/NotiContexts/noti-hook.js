//noti-hook.js

import { useState,} from "react";
import { useAxiosInstance } from "src/Shared/axiosInstance/useAxiosInstance.js";
import { getTotalNoOfNoti } from "src/Shared/APIUrls";
export const useNotiHook = () => {

    const [notiCount, setNotiCount] = useState(null);
    const { axiosInstance } = useAxiosInstance();

    const getNotiCount = () => {
        axiosInstance({
            url: getTotalNoOfNoti,
            method: "GET",
        }).then((response) => {
            // setNotiCount(response?.data?.data?.count);
        }).catch((error) => {

        });

    };

    return { notiCount, setNotiCount, getNotiCount };
};
