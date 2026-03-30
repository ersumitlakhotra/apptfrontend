// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { loginAuth } from "../hook/apiCall";
import { jwtDecode } from "jwt-decode";
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [isTawkLogin, setIsTawkLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on refresh
    useEffect(() => {
        setIsLoading(true)
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.expiresIn * 1000 < Date.now()) {
                    login(decoded.username, decoded.password);
                }
                else {
                    setIsTawkLogin(true);
                    setIsAuthenticated(true);
                    setPermissions(decoded.permissions);
                }
            }
            catch (error) {
                logout();
            }
        }
        else
            logout();
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
            if (Boolean(data.status)) {
                const decoded = jwtDecode(data.token);
                setPermissions(decoded.permissions);
                if(!isTawkLogin)
                {
                 waitForTawk(() => {
                    loginTawkUser(decoded.uid,username);             
                    setIsTawkLogin(true);
                 });
                }
            }
            setIsAuthenticated(data.status);
            return { status: data.status, message: data.message };
        }
        catch (err) {
            logout();
            return { status: false, message: String(err.message) };
        }
        finally {
            setIsLoading(false)
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setPermissions([]);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        waitForTawk(() => {
            if (isAuthenticated) {
                window.Tawk_API.showWidget();
            } else {
                if (isTawkLogin) {
                    window.Tawk_API.logout(
                        function (error) {
                            if (error) {
                                // console.error("Tawk Logout error:", error);
                            } else {
                                setIsTawkLogin(false)
                                window.location.reload(); 
                            }
                        });
                }
                window.Tawk_API.hideWidget();
            }
        });
    }, [isAuthenticated])

    const waitForTawk = (callback) => {
        const interval = setInterval(() => {
            if (Object.keys(window.Tawk_API).length > 0) {
                clearInterval(interval);
                callback();
            }
        }, 100); // check every 100ms
    };

    const loginTawkUser = (id, name ) => {

        const hash = HmacSHA256(id, process.env.REACT_APP_TAWK_TO_SECRET).toString(Hex) // ✅ MUST use email
        window.Tawk_API.login({
            userId: id,
            name: name,
            hash: hash,
        });
        {/* window.Tawk_API.login(
                {
                    userId: id,
                    name: name,
                    //email: user.email,
                    hash: hash,
                },
                function (error) {
                    if (error) {
                        console.error("Tawk login error:", error);
                    } else {
                        console.log("Tawk login success");
                    }
                }
            );
            
               

            */}
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, permissions, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
