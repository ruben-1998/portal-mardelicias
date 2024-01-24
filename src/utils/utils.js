
export const isBrowser = () => typeof window !== "undefined"

export const setLocalStorage = (key, item) => isBrowser() && localStorage.setItem(key, item);

export const getLocalStorage = (key) => isBrowser() && localStorage.getItem(key);

export const removeLocalStorage = (key) => isBrowser() && localStorage.removeItem(key);
