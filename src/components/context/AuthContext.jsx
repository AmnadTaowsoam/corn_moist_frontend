import React, { createContext, useContext, useState } from "react";
import users from "../../assets/authConfig";
console.log("Loaded users:", users);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        console.log("Attempting login for:", username);
        const userCredentials = users[username];
        console.log("User Credentials:", userCredentials);
        if (userCredentials && userCredentials.password === password) {
            setUser({
                username: userCredentials.username,
                role: userCredentials.role,
                // Adjusting this to match expected structure in the consumer
                machineId: userCredentials.machine_id,
            });
            return true;
        } else {
            alert("Incorrect username or password!!!");
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    // Adjusting the context value to include machineId directly
    const contextValue = {
        user,
        login,
        logout,
        // Destructuring machineId from user if user is not null; otherwise, default to null
        machineId: user ? user.machineId : null,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

