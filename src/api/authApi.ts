import { AxiosInstance } from "axios";

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

export const registerUser = (api: AxiosInstance, data: RegisterData) => {
    return api.post("/api/account/register/", data);
};

export const confirmCode = (api: AxiosInstance, username: string, code: string) => {
    return api.post("/api/account/confirm/", { username, code });
};

export const loginUser = async (api: AxiosInstance, data: LoginData): Promise<string> => {
    const res = await api.post("/api/account/login/", data, {
        withCredentials: true,
    });

    return res.data.access_token;
};

export const refreshToken = async (api: AxiosInstance): Promise<string> => {
    const res = await api.post("/api/account/token/refresh/", {}, { withCredentials: true });
    return res.data.access;
};


export const logoutUser = async (api: AxiosInstance) => {
    return await api.post("/api/account/logout/", {}, { withCredentials: true });
};
