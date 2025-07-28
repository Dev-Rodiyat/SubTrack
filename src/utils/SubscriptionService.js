const STORAGE_KEY = "subscriptions";

export const saveSubscription = (sub) => {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updated = [sub, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getSubscriptions = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const clearSubscriptions = () => {
    localStorage.removeItem(STORAGE_KEY);
};
