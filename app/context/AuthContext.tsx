"use client";
import { createContext, useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  phone: string;
}

interface StateType {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthStateType extends StateType {
  setAuthState: React.Dispatch<React.SetStateAction<StateType>>;
}

export const AuthContext = createContext<AuthStateType>({
  loading: true,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<StateType>({
    loading: false,
    data: null,
    error: null,
  });
  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
