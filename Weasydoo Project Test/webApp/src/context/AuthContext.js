"use client";
import { createContext, use, useContext, useState } from "react";
import { useRouter } from "next/navigation";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const router = useRouter();

    const login = async (username, password) => {
        try {
            const response = await fetch('https://fakestoreapi.com/users');
            const users = await response.json();

            const foundUser = users.find(user => user.username === username && user.password === password);
            if (foundUser) {
                const role = foundUser.id === 1 ? "admin" : "user"; // Assuming id 1 is admin
                setUser({ ...foundUser, role });
                router.push('/');
            } else {
                throw new Error("Invalid username or password");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + error.message);
        }
    };

    const logout = () => {
        setUser(null);
        router.push('/login');
    }

return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
