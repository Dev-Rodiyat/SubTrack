import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "subscriptions";

const SubscriptionsContext = createContext();

export const SubscriptionsProvider = ({ children }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setSubscriptions(JSON.parse(stored));
            } catch (error) {
                console.error("Error parsing stored subscriptions:", error);
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
        }
    }, [subscriptions, isLoaded]);

    const addSubscription = (data) => {
        const newSub = { ...data, id: uuidv4() };
        setSubscriptions((prev) => [newSub, ...prev]);
    };

    const updateSubscription = (id, data) => {
        setSubscriptions((prev) =>
            prev.map((sub) => (sub.id === id ? { ...sub, ...data } : sub))
        );
    };

    const deleteSubscription = (id) => {
        setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    };

    const clearSubscriptions = () => {
        setSubscriptions([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <SubscriptionsContext.Provider
            value={{
                subscriptions,
                addSubscription,
                updateSubscription,
                deleteSubscription,
                clearSubscriptions,
                isLoaded
            }}
        >
            {children}
        </SubscriptionsContext.Provider>
    );
};

export const useSubscriptions = () => {
    const context = useContext(SubscriptionsContext);
    if (!context) {
        throw new Error("useSubscriptions must be used within a SubscriptionsProvider");
    }
    return context;
};