import axios from "axios";

const PUBLIC_ENDPOINTS = ["/api/account/register/", "/api/account/login/", "/api/account/confirm/"];

export const createAxiosInstance = () => {
    const api = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
    });

    const plainAxios = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
    });

    api.interceptors.request.use(config => {
        const isPublic = PUBLIC_ENDPOINTS.some(path => config.url?.includes(path));
        const token = localStorage.getItem("accessToken");

        if (token && !isPublic) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    api.interceptors.response.use(
        res => res,
        async (err) => {
            const originalRequest = err.config;

            const isAuthError = err.response?.status === 401 && !originalRequest._retry;
            if (isAuthError) {
                originalRequest._retry = true;
                try {
                    const refreshRes = await plainAxios.post("/api/account/token/refresh/", {});
                    const newAccess = refreshRes.data.access;

                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                    api.defaults.headers.Authorization = `Bearer ${newAccess}`;

                    localStorage.setItem("accessToken", newAccess);

                    return api(originalRequest);
                } catch (refreshErr) {
                    console.error("Refresh failed:", refreshErr);
                }
            }

            return Promise.reject(err);
        }
    );

    return api;
};
