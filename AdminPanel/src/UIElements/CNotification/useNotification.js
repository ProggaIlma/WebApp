import { notification } from 'antd';
export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (notiType, notiTitle, desc, duration) => {
        api[notiType]({
            message: notiTitle,
            description: desc,
            duration: duration || 3
        });
    };
    return { api, contextHolder, openNotificationWithIcon };
};
