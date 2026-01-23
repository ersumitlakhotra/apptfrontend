// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { loginAuth } from "../hook/apiCall";
import { setLocalStorageWithExpiry } from "../common/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on refresh
    useEffect(() => {
        const companyId = localStorage.getItem("cid");
        const userId = localStorage.getItem("uid");

        if (companyId && userId) {
            setUser(userId);
        }
    }, []);

    const login = async (username, password) => {
        // 🔁 replace with real API call
        try {
            const res = await loginAuth(username, password);
            if (res.status === 200 && res.data.data.length === 1) {
                if (Boolean(res.data.data[0].active)) {
                    setLocalStorageWithExpiry('cid', res.data.data[0].cid);
                    setLocalStorageWithExpiry('uid', res.data.data[0].id);
                    setLocalStorageWithExpiry('role', res.data.data[0].role);
                    setLocalStorageWithExpiry('username', username, 60);
                    setLocalStorageWithExpiry('password', password, 60);
                    setUser(res.data.data[0].id);
                    return { status: true, data: res.data.data[0], message: 'Login Successful' };
                }
                else
                    return { status: false, data: null, message: 'Your account is deactivated and cannot access the application. Please contact our help desk!' };
            }
            else if (res.data.data.length > 1)
                return { status: false, data: null, message: 'The username is allocated to a separate potal. Ensure that each account has a unique password.' };
            else
                return { status: false, data: null, message: 'Login Failed. Invalid username or password.' };
        }
        catch (err) {
            return { status: false, data: null, message: String(err.message) };
        }
    };

    const logout = () => {
        localStorage.removeItem('cid');
        localStorage.removeItem('uid');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
        setUser(null);
    }; 
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
