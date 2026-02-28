import React, { createContext, useContext } from "react";

// Simplified User interface matched to our needs
interface User {
    id: string;
    email?: string;
    user_metadata?: {
        full_name?: string;
        phone_number?: string;
    };
}

interface AuthContextType {
    session: any | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate a dummy guest user so checkout works without Supabase auth
const guestUser: User = {
    id: 'guest',
    user_metadata: {
        full_name: '',
        phone_number: ''
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const signOut = async () => {
        console.log("Logout clicked (Static build - no auth)");
    };

    return (
        <AuthContext.Provider value={{ session: {}, user: guestUser, loading: false, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
