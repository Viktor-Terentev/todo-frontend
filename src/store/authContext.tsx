import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    setAccessToken: () => {},
    isAuthReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("accessToken");
        if (saved) {
            setAccessTokenState(saved);
            setIsAuthReady(true);
        }
    }, []);

    const setAccessToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
        setAccessTokenState(token);
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isAuthReady }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
