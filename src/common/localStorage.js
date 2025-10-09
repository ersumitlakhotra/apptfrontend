export const setLocalStorageWithExpiry = (key, value, expiryMinutes) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expiryMinutes * 60 * 1000, // expiry in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
};