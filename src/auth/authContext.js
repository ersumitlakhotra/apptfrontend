// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { loginAuth } from "../hook/apiCall";
import { setLocalStorageWithExpiry } from "../common/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on refresh
    useEffect(() => {
        setIsLoading(true)
        const companyId = localStorage.getItem("cid");
        if (companyId) {
            setIsAuthenticated(true);
        }
        setIsLoading(false)
    }, []);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "cid" && !event.newValue) {
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
            if (res.status === 200 && res.data.data.length === 1) {
                if (Boolean(res.data.data[0].active)) {
                    setLocalStorageWithExpiry('cid', res.data.data[0].cid);
                    setLocalStorageWithExpiry('uid', res.data.data[0].id);
                    setLocalStorageWithExpiry('role', res.data.data[0].role);
                    setLocalStorageWithExpiry('username', username, 60);
                    setLocalStorageWithExpiry('password', password, 60);
                    setIsAuthenticated(true);
                    return { status: true, data: res.data.data[0], message: 'Login Successful' };
                }
                else
                {
                    setIsAuthenticated(false);
                    return { status: false, data: null, message: 'Your account is deactivated and cannot access the application. Please contact our help desk!' };
                }
            }
            else if (res.data.data.length > 1)
            {
                setIsAuthenticated(false);
                return { status: false, data: null, message: 'The username is allocated to a separate potal. Ensure that each account has a unique password.' };
            }
            else
            { 
                setIsAuthenticated(false); 
                return { status: false, data: null, message: 'Login Failed. Invalid username or password.' };
            }
        }
        catch (err) {
            setIsAuthenticated(false);
            return { status: false, data: null, message: String(err.message) };
        }
        finally
        {
        setIsLoading(false)
        }
    };

    const logout = () => {
        localStorage.removeItem('cid');
        localStorage.removeItem('uid');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
    }; 
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
