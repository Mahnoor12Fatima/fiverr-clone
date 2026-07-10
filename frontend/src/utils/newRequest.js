import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:4000",
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