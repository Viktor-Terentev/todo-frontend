import { useAuth } from "../store/authContext";
import { createAxiosInstance } from "../api/axios";
import {
    registerUser,
    confirmCode,
    loginUser,
    logoutUser,
    refreshToken,
} from "../api/authApi";

export const useAuthApi = () => {
    const { accessToken, setAccessToken } = useAuth();
    const api = createAxiosInstance(accessToken ?? undefined);


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
        register: (data) => registerUser(api, data),
        confirm: (u, c) => confirmCode(api, u, c),
        login,
        logout,
        refresh,
        api,
    };
};
