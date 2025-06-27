//noti-context.js

import { createContext } from "react";
export const NotiContext = createContext({
    notiCount: null,
    getNotiCount: () => { },
    setNotiCount: () => { }
});
