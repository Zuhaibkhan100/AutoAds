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
        <nav className="bg-primary/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src={brandNameImg.src} alt="Auto Ads Logo" className="h-16 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2 relative" ref={navRef}>
                            {/* Animated Bubble background */}
                            <div 
                                className="absolute h-10 bg-gradient-to-r from-accent/20 to-accent/5 rounded-full transition-all duration-300 ease-out pointer-events-none z-0 shadow-[0_0_20px_rgba(255,214,10,0.1)]"
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
                                        className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            active 
                                            ? 'text-accent shadow-[inset_0_0_10px_rgba(255,214,10,0.2)] border border-accent/20' 
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        {active && (
                                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#FFD60A]"></span>
                                        )}
                                    </Link>
                                );
                            })}
                            
                            <div className="w-4"></div> {/* spacer */}

                            {user?.role === 'admin' && (
                                <Link href="/admin" className="flex items-center gap-1.5 text-accent hover:text-yellow-300 transition-colors px-3 py-2 rounded-md text-sm font-medium border border-accent/30 hover:border-accent/60 z-10">
                                    <Shield className="w-4 h-4" /> Admin
                                </Link>
                            )}

                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-md text-sm font-medium z-10"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-primary/95 backdrop-blur-xl border-b border-gray-800 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                                        active 
                                        ? 'bg-accent/10 text-accent border-l-4 border-accent pl-3' 
                                        : 'text-gray-300 hover:bg-gray-800/50'
                                    }`}
                                >
                                    {link.name}
                                    {active && <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_#FFD60A]"></div>}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-gray-800 mt-4 space-y-4">
                            {user?.role === 'admin' && (
                                <Link href="/admin" onClick={() => setIsOpen(false)} className="text-accent block px-4 py-2 rounded-md text-base font-medium">
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="text-red-400 hover:text-red-300 block px-4 py-2 rounded-md text-base font-medium w-full text-left"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

