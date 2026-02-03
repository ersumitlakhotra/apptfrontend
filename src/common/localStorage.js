export const setLocalStorageWithExpiry = (key, value, expiryMinutes = 0) => {
    if (expiryMinutes > 0) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + expiryMinutes * 60 * 1000, // expiry in milliseconds
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    else { 
        localStorage.setItem(key, value);
    }
};

export const getStorage = async() => {
    return {
        cid: localStorage.getItem("cid"),
        uid: localStorage.getItem("uid"),
        role: localStorage.getItem("role"),
        isAdmin: Boolean(localStorage.getItem("role") === 'Administrator')
    }
};