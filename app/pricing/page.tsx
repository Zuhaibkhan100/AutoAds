'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Pricing() {
    const router = useRouter();
    const [expanding, setExpanding] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const logClick = async (pkg: string) => {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'click_quote', package: pkg }),
            });
        } catch (e) {
            console.error('Failed to log click', e);
        }
    };

    const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>, pkg: string) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        // Use center of the button for transition origin
        setMousePos({ 
            x: rect.left + rect.width / 2, 
            y: rect.top + rect.height / 2 
        });
        setExpanding(true);
        logClick(pkg);
        
        // Use router for smoother navigation after animation
        setTimeout(() => {
            router.push(`/quote?package=${pkg}`);
        }, 950);
    };

    return (
        <div className="pt-20 pb-24 relative overflow-hidden min-h-screen">
            {/* Immersive Splash Overlay */}
            {expanding && (
                <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
                    <div 
                        className="absolute bg-accent rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${mousePos.x}px`,
                            top: `${mousePos.y}px`,
                            width: '250vmax',
                            height: '250vmax',
                            animation: 'expand-radial 1s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                        }}
                    />
                </div>
            )}

            <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none transition-all duration-1000 group-hover:bg-accent/10"></div>
            <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[600px] h-[600px] bg-highlight/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6 tracking-tight">
                        Simple, <span className="text-accent underline decoration-accent/30 underline-offset-8">Transparent</span> Pricing
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        Choose a package that fits your growth goals. No hidden fees, completely managed execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                        { id: '1month', name: '1 Month', subtitle: 'Short term trial', desc: 'Campaign', items: ['Short Campaign', 'High Impact', 'Basic reporting'], glow: 'from-blue-600/40' },
                        { id: '3months', name: '3 Months', subtitle: 'Quarterly push', desc: 'Sub', items: ['Quarterly Presence', 'Extended Reach', 'Regular Reporting'], glow: 'from-purple-600/40' },
                        { id: '6months', name: '6 Months', subtitle: 'Half-yearly coverage', desc: 'Sub', items: ['Strong Presence', 'City Zones Coverage', 'Detailed Insights'], glow: 'from-accent/40' },
                        { id: 'yearly', name: 'Yearly', subtitle: 'Annual commitment', desc: 'Sub', items: ['Complete Dominance', 'Maximum Impact', 'Dedicated Dashboard'], glow: 'from-green-600/40' },
                    ].map((plan, idx) => (
                        <div 
                            key={plan.id}
                            className="glass-panel group relative overflow-hidden flex flex-col transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(255,214,10,0.15)] h-[32rem] border border-white/5 hover:border-white/20"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Fluid Base Effect */}
                            <div className={`absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t ${plan.glow} via-transparent to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0 pointer-events-none`}></div>
                            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-white/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000 z-0 pointer-events-none"></div>

                            <div className="relative z-10 flex-grow p-8 flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-1 font-poppins">{plan.name}</h3>
                                        <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase">{plan.subtitle}</p>
                                    </div>
                                    <div className="text-sm font-black text-white/30 group-hover:text-white/80 transition-colors">.0{idx + 1}</div>
                                </div>
                                
                                <ul className="space-y-4 mb-8 flex-grow mt-auto pt-8">
                                    {plan.items.map((item, i) => (
                                        <li key={i} className="flex items-start text-gray-300 group-hover:text-white transition-colors">
                                            <div className="mr-3 mt-1 bg-white/5 p-1 rounded-full border border-white/10 group-hover:border-accent/50 transition-colors">
                                                <Check className="w-3 h-3 text-white group-hover:text-accent" />
                                            </div>
                                            <span className="text-sm font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={(e) => handleQuoteClick(e as any, plan.id)}
                                    className="w-full relative overflow-hidden group/btn py-4 bg-black/40 hover:bg-white backdrop-blur-md border border-white/10 hover:border-white rounded-2xl font-bold text-white hover:text-black transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-auto"
                                >
                                    Get Quote
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center animate-in fade-in zoom-in duration-1000 delay-500">
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 mb-6 w-full max-w-sm h-px"></div>
                    <p className="text-2xl font-bold text-white mb-4">Talk to our experts about your vision.</p>
                    <p className="text-gray-400">
                        Ready to start? 
                        <Link href="/contact" className="ml-2 text-accent hover:text-white font-bold transition-all underline decoration-2 underline-offset-4 decoration-accent/30 hover:decoration-accent">
                            Contact Admin for a free consultation.
                        </Link>
                    </p>
                    
                    <div className="mt-12 flex justify-center gap-8 opacity-40">
                        {/* Subtle decorative SVGs */}
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                           <circle cx="12" cy="12" r="5"/>
                        </svg>
                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M7 10l5 5 5-5H7z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

