'use client';

import Link from 'next/link';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import brandNameImg from '../Assets/image_assets/brand_name.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();
    
    // Hover animation states
    const [hoverData, setHoverData] = useState({ left: 0, width: 0, opacity: 0 });
    const navRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        const navRect = navRef.current?.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        if (navRect) {
            setHoverData({
                left: targetRect.left - navRect.left,
                width: targetRect.width,
                opacity: 1
            });
        }
    };

    const handleMouseLeave = () => {
        setHoverData(prev => ({ ...prev, opacity: 0 }));
    };

    const navLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="glass-pill w-full max-w-5xl px-6 py-2 flex items-center justify-between pointer-events-auto transition-all duration-500">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center group">
                        <img src={brandNameImg.src} alt="Auto Ads Logo" className="h-12 w-auto transition-transform group-hover:scale-105" />
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-1 relative" ref={navRef}>
                    {/* Animated Bubble background */}
                    <div 
                        className="absolute h-10 bg-white/10 rounded-full transition-all duration-300 ease-out pointer-events-none z-0 backdrop-blur-md"
                        style={{
                            left: `${hoverData.left}px`,
                            width: `${hoverData.width}px`,
                            opacity: hoverData.opacity,
                            transform: `scale(${hoverData.opacity ? 1 : 0.8})`
                        }}
                    />

                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className={`relative z-10 px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                                    active 
                                    ? 'text-white font-semibold bg-white/10' 
                                    : 'text-gray-400 font-medium hover:text-white'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    
                    <div className="w-4"></div> {/* spacer */}

                    {user?.role === 'admin' && (
                        <Link href="/admin" className="flex items-center gap-1.5 text-white hover:text-accent transition-colors px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 hover:border-accent/50 z-10">
                            <Shield className="w-4 h-4" /> Admin
                        </Link>
                    )}

                    <button
                        onClick={logout}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-full text-sm font-medium z-10"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>

                <div className="flex md:hidden items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-20 left-4 right-4 bg-primary/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden animate-in slide-in-from-top-4 duration-300 shadow-2xl pointer-events-auto">
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base transition-all ${
                                        active 
                                        ? 'bg-white/10 text-white font-bold' 
                                        : 'text-gray-400 font-medium hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
                            {user?.role === 'admin' && (
                                <Link href="/admin" onClick={() => setIsOpen(false)} className="text-accent block px-5 py-3 rounded-2xl text-base font-medium hover:bg-white/5">
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="text-red-400 hover:bg-red-400/10 block px-5 py-3 rounded-2xl text-base font-medium w-full text-left transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

