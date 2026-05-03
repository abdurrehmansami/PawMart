import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pawmart_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('pawmart_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pawmart_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('pawmart_session');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pawmart_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const register = (name: string, email: string, password: string) => {
    const exists = registeredUsers.find(u => u.email === email);
    if (exists) return { success: false, message: 'Email already registered.' };

    const newUser = { id: Math.random().toString(36).substr(2, 9), name, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    return { success: true, message: 'Registration successful! Please login.' };
  };

  const login = (email: string, password: string) => {
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userSession } = foundUser;
      setUser(userSession);
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
