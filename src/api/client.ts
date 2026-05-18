// import axios from "axios";
// import { getAccessToken, setAccessToken } from "./tokenService";

// const API_BASE_URL = "http://localhost:8080";

// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// // Attach token automatically
// apiClient.interceptors.request.use((config) => {
//   const token = getAccessToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // client.ts (continue)

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) prom.resolve(token);
//     else prom.reject(error);
//   });
//   failedQueue = [];
// };

// // handle refresh token
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If token expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return apiClient(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await apiClient.post(
//           "/auth/refresh",
//           {},
//           { withCredentials: true },
//         );

//         const newToken = res.data.accessToken;

//         setAccessToken(newToken);
//         processQueue(null, newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);

//         // 🔥 Logout user
//         setAccessToken(null);
//         window.location.href = "/login";

//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "./auth.apiClient";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 🔥 MUST for cookies
});

// Prevent multiple refresh calls
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error?: any) => void;
}[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(true);
    }
  });
  failedQueue = [];
};

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        await refreshToken(); // cookie-based refresh

        processQueue(null);

        return apiClient(originalRequest); // 🔁 retry original request
      } catch (refreshError) {
        processQueue(refreshError);

        // logout scenario
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
