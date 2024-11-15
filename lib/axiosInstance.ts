import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const axiosInstance = axios.create({ baseURL: BASE_URL });

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response data has the createdAt field and transform it
    if (Array.isArray(response.data)) {
      response.data = response.data.map((item) => {
        if (item.createdAt) {
          return { ...item, createdAt: new Date(item.createdAt) };
        }
        return item;
      });
    } else if (response.data && response.data.createdAt) {
      response.data.createdAt = new Date(response.data.createdAt);
    }

    // Return the modified response
    return response;
  },
  (error) => {
    // Handle errors if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
