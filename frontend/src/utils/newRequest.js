import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://fiverr-clone-production-c2eb.up.railway.app",
});

newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;
