'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <AuthProvider>
            {!isLoginPage && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {!isLoginPage && <Footer />}
        </AuthProvider>
    );
}
