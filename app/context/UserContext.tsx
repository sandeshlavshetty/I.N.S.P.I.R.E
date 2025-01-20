'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    title: string;
    bio: string;
    stats: {
        projects: number;
        polls: number;
        achievements: number;
    };
    socialLinks: {
        github: string;
        linkedin: string;
        website: string;
    };
    role: string;
    btid: string;
    approval: number;
    chosen_option: string;
    d_optn: string;
    projects: {
        id: string;
        title: string;
        description: string;
        githubRepoLink: string;
        liveOnLink: string;
        youtubeDemoLink?: string;
    }[];
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    // Rehydrate user data on reload
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); // Rehydrate from localStorage
                } else {
                    // Optionally fetch from an API if no local data is available
                    const response = await fetch('/api/user');
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        localStorage.setItem("user", JSON.stringify(userData));
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    // Save user data to localStorage whenever it updates
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
