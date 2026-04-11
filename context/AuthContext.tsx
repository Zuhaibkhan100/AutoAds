'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type UserRole = 'admin' | 'viewer' | null;

interface AuthUser {
    email: string;
    role: UserRole;
}

interface AuthContextType {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => false,
    logout: () => {},
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

const ADMIN_EMAIL = 'autoads.marketing@gmail.com';
const ADMIN_PASSWORD = 'Gmail@autoads123';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('autoads_user');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
        setIsLoading(false);
    }, []);

    // Redirect unauthenticated users to login
    useEffect(() => {
        if (!isLoading && !user && pathname !== '/login') {
            router.push('/login');
        }
    }, [user, isLoading, pathname, router]);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success && data.user) {
                setUser(data.user);
                localStorage.setItem('autoads_user', JSON.stringify(data.user));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error', error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('autoads_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
