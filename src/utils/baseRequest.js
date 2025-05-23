import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl = import.meta.env.VITE_API_URL;
const baseApiUrl = `${apiUrl}/api/v1`;

export const axiosBaseConfig = {
  baseURL: baseApiUrl,
  headers: {
    "X-Client-Type": "web",
  },
  timeout: 60000,
};

const request = axios.create(axiosBaseConfig);

// Request interceptor
request.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const res = await axios.post(
          `${baseApiUrl}/auth/refresh-token`,
          { refresh_token: refreshToken },
          {
            headers: { "X-Client-Type": "web" },
            withCredentials: true,
          }
        );
        const newAccessToken = res.data.data.access_token;
        Cookies.set("accessToken", newAccessToken, {
          secure: true,
          sameSite: "strict",
        });
        request.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return request(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else if (error?.response?.status === 403) {
      throw Object.assign(new Error("Unauthorized Access"), { statusCode: 403 });
    }
    return Promise.reject(error);
  }
);

export default request;
