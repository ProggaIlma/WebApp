const serverUrl =
  "https://genai-backend-fbe4ecgffrh4hzhs.southeastasia-01.azurewebsites.net/api";
const localUrl = "http://localhost:5000/";

export const baseURL = localUrl;

// Products
export const getProducts = `${baseURL}/product/getProducts`;
export const getProductById =  `${baseURL}/product`;
