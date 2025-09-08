import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const API_BASE_URL = isProduction
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export const uploadStatement = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/analyze-statement", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${progress}%`);
      }
    },
  });

  return response.data;
};

export default api;
