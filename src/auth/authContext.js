// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { loginAuth } from "../hook/apiCall";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on refresh
    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.expiresIn * 1000 < Date.now()) {
              login(decoded.username, decoded.password);
            }
            else
                setIsAuthenticated(true);
        }
        else
            setIsAuthenticated(false);
        setIsLoading(false)
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "token" && !event.newValue) {
                // Token removed in another tab
                logout();   // your logout function
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const login = async (username, password) => {
        // 🔁 replace with real API call
        setIsLoading(true)
        try {
            const res = await loginAuth(username, password);

            const data = res.data.data;
            localStorage.setItem('token', data.token);

            setIsAuthenticated(data.status);
            return { status: data.status, message: data.message };
        }
        catch (err) {
            setIsAuthenticated(false);
            return { status: false,  message: String(err.message) };
        }
        finally
        {
        setIsLoading(false)
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }; 

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
