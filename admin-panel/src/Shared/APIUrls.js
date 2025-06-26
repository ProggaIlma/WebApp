const serverUrl =
  "http://localhost:5000";
const localUrl = "http://localhost:5000";

export const baseURL = serverUrl;
export const loginURL = `${baseURL}/tz/login`;
export const setPasswordURL = `${baseURL}/tz/set-password`;
export const resetPasswordReqURL = `${baseURL}/tz/forgot-password`;




//Product
export const productDetailsApi = `${baseURL}/product`;
export const productApi = `${baseURL}/product/getProducts`;
export const productUpdateApi = `${baseURL}/product`;
export const uploadImageToCloud = `${baseURL}/upload`;


// setting
export const generalSettingAPI = `${baseURL}/tz/setting`;
export const discountURL = `${baseURL}/tz/discount`;
export const subscriptionPlanURL = `${baseURL}/tz/subscription`;

// Notification
export const notificationsAPI = `${baseURL}/tz/notifications/get-notifications`;
export const unreadNotificationCountAPI = `${baseURL}/tz/notifications/get-unread-not-count`;
export const markAsReadAPI = `${baseURL}/tz/notifications/mark-as-read`;
export const markAsAllReadAPI = `${baseURL}/tz/notifications/mark-as-all-read`;
export const unreadCountAPI = `${baseURL}/tz/notifications/get-unread-not-count`;
