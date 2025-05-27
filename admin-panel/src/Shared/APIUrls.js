const serverUrl =
  "http://localhost:5000";
const localUrl = "http://localhost:5000";

export const baseURL = serverUrl;
export const loginURL = `${baseURL}/tz/login`;
export const setPasswordURL = `${baseURL}/tz/set-password`;
export const resetPasswordReqURL = `${baseURL}/tz/forgot-password`;



// Image Upload
export const uploadImageToCloud = `${baseURL}/crm/upload-image`;
export const uploadFileToCloud = `${baseURL}/crm/upload-file`;
export const uploadAudioToCloud = `${baseURL}/crm/upload-audio-file`;
export const getFileFromCloud = `${baseURL}/crm/get-cloud-file`;

//Profile Settings
export const getProfileSettings = `${baseURL}/crm/profile-settings`;

// Subscriber
export const subscriberUrl = `${baseURL}/tz/org-subscribers`;
export const subscriberInfoUrl = `${baseURL}/tz/org-subscriber-info`;
export const subscriptionPlansUrl = `${baseURL}/org/all-subplans`;
export const orgMembersUrl = `${baseURL}/tz/org-members`;
export const orgProductsUrl = `${baseURL}/tz/org-products`;

//Subscription

export const subscriptionApi = `${baseURL}/tz/subscription`;
// TopUp
export const topUpAPI = `${baseURL}/tz/topup`;
//Product
export const productDetailsApi = `${baseURL}/tz/products/get-product`;
export const productApi = `${baseURL}/product/getProducts`;
export const productUpdateApi = `${baseURL}/tz/products/update-product`;

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
