import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (storedUser && isLoggedIn === "true") {
            setUser(storedUser);
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (
            storedUser &&
            storedUser.email === email &&
            storedUser.password === password
        ) {
            localStorage.setItem("isLoggedIn", "true");
            setUser(storedUser);
            setIsLoggedIn(true);
            return true;
        }
        return false;
    };

    const signup = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUser(data);
        return true;
    };

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        setUser(null);
        setIsLoggedIn(false);
        navigate("/login", { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);