'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the user object
// Define the AuthUser type
export interface AuthUser {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}


// Define the type for the context value
interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

// Create the context with a default value of `null`
export const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

// Define the type for the provider's children
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user-info");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};