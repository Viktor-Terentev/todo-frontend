import { useAuth } from "../store/authContext";
import { createAxiosInstance } from "../api/axios";
import {
    registerUser,
    confirmCode,
    loginUser,
    logoutUser,
    refreshToken,
} from "../api/authApi";

type RegisterData = {
    username: string;
    email: string;
    password: string;
}

export const useAuthApi = () => {
    const { setAccessToken } = useAuth();
    const api = createAxiosInstance();


    const login = async (data: { username: string; password: string }) => {
        const token = await loginUser(api, data);
        setAccessToken(token);
    };

    const logout = async () => {
        await logoutUser(api);
        setAccessToken(null);
    };

    const refresh = async () => {
        const token = await refreshToken(api);
        setAccessToken(token);
    };

    return {
        register: (data: RegisterData) => registerUser(api, data),
        confirm: (u: string, c: string) => confirmCode(api, u, c),
        login,
        logout,
        refresh,
        api,
    };
};
