import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageAdapter, STORAGE_KEYS } from '../lib/storageAdapter';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'admin';
  createdAt: string;
  avatarUrl?: string;
  phone?: string;
  nid?: string;
  nidVerified?: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  nid?: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
  nid?: string;
}

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoSession: boolean;
  login: (creds: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: () => void;
  register: (creds: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserAccount>) => void;
  resetDemoUser: () => void;
}

const DEFAULT_DEMO_USER: UserAccount = {
  id: 'USER-DEMO-001',
  name: 'Tanvir Hossain',
  email: 'demo@bhumisure.org',
  role: 'buyer',
  createdAt: '2026-01-15T10:00:00.000Z',
  phone: '+880 1712-345678',
  nid: '19922692015000142',
  nidVerified: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    return StorageAdapter.getItem<UserAccount | null>(STORAGE_KEYS.AUTH_USER, null);
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Sync to storage
    if (currentUser) {
      StorageAdapter.setItem(STORAGE_KEYS.AUTH_USER, currentUser);
    } else {
      StorageAdapter.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [currentUser]);

  const login = async (creds: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate natural realistic network latency
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsLoading(false);

    const email = creds.email.trim().toLowerCase();
    const rawNid = (creds.nid || '')
      .replace(/[\u09E6-\u09EF]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)))
      .replace(/\D/g, '');

    // Mandatory National ID (NID) Verification check
    if (!rawNid || (rawNid.length !== 10 && rawNid.length !== 13 && rawNid.length !== 17)) {
      return {
        success: false,
        error: 'জাতীয় পরিচয়পত্র (NID) নম্বর ১০ বা ১৭ ডিজিটের হতে হবে এবং ভেরিফাই করা বাধ্যতামূলক। (NID verification is mandatory)',
      };
    }

    // Check if demo user or newly registered
    if (email === 'demo@bhumisure.org' || email.includes('@')) {
      const user: UserAccount = {
        id: `USER-${Date.now()}`,
        name: email === 'demo@bhumisure.org' ? 'Tanvir Hossain' : email.split('@')[0].replace('.', ' '),
        email,
        role: email.startsWith('admin') ? 'admin' : 'buyer',
        createdAt: new Date().toISOString(),
        nid: rawNid,
        nidVerified: true,
      };
      setCurrentUser(user);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. For evaluation, use demo@bhumisure.org or any valid email format.',
    };
  };

  const quickDemoLogin = () => {
    setCurrentUser(DEFAULT_DEMO_USER);
  };

  const register = async (creds: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);

    const email = creds.email.trim().toLowerCase();
    const rawNid = (creds.nid || '')
      .replace(/[\u09E6-\u09EF]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)))
      .replace(/\D/g, '');

    // Disallow duplicate demo email if already same
    if (currentUser && currentUser.email === email && currentUser.id === DEFAULT_DEMO_USER.id) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please sign in.',
      };
    }

    // Mandatory National ID (NID) Verification check
    if (!rawNid || (rawNid.length !== 10 && rawNid.length !== 13 && rawNid.length !== 17)) {
      return {
        success: false,
        error: 'জাতীয় পরিচয়পত্র (NID) নম্বর ১০ বা ১৭ ডিজিটের হতে হবে এবং ভেরিফাই করা বাধ্যতামূলক। (NID verification is mandatory)',
      };
    }

    const newUser: UserAccount = {
      id: `USER-${Date.now()}`,
      name: creds.name.trim(),
      email,
      role: 'buyer',
      createdAt: new Date().toISOString(),
      nid: rawNid || '19922692015000142',
      nidVerified: true,
    };

    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    StorageAdapter.removeItem(STORAGE_KEYS.AUTH_USER);
  };

  const updateProfile = (updates: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
  };

  const resetDemoUser = () => {
    setCurrentUser(DEFAULT_DEMO_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        isLoading,
        isDemoSession: true, // Always disclosed
        login,
        quickDemoLogin,
        register,
        logout,
        updateProfile,
        resetDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
