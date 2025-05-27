const serverUrl =
  "https://genai-backend-fbe4ecgffrh4hzhs.southeastasia-01.azurewebsites.net/api";
const localUrl = "http://localhost:5000/";

export const baseURL = serverUrl;
export const loginURL = `${baseURL}/tz/login`;
export const setPasswordURL = `${baseURL}/tz/set-password`;
export const resetPasswordReqURL = `${baseURL}/tz/forgot-password`;

//Product
// http://localhost:5000/product/getProducts?page=1&limit=5
export const productApi = `${baseURL}/product/getProducts`;

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
export const orgPaymentsUrl = `${baseURL}/tz/org-payments`;

//Subscription

export const subscriptionApi = `${baseURL}/tz/subscription`;
// TopUp
export const topUpAPI = `${baseURL}/tz/topup`;
//Payment
export const paymentDetailsApi = `${baseURL}/tz/payments/get-payment`;
export const paymentApi = `${baseURL}/tz/payments/get-payments`;
export const paymentUpdateApi = `${baseURL}/tz/payments/update-payment`;

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
