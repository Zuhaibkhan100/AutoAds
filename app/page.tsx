'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Map, TrendingUp, ArrowRight, Quote, Users, Zap, Target, Star } from 'lucide-react';
import HeroScene from './components/HeroScene';

export default function Home() {
    const [processVisible, setProcessVisible] = useState(false);
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setProcessVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (processRef.current) {
            observer.observe(processRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const [previewTransform, setPreviewTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    
    const handlePreviewMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        setPreviewTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
    };

    const handlePreviewMouseLeave = () => {
        setPreviewTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
    };

    return (
        <div className="relative">
            {/* Hero Section - Crystal Clear Unicorn Scene */}
            <section className="relative overflow-hidden border-b border-gray-800 bg-black h-screen flex items-center justify-start">
                <HeroScene />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-center justify-start z-20 pointer-events-none">
                    {/* Glowing Mesh Background */}
                    <div className="absolute inset-0 glow-mesh opacity-60"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                        <div className="w-full max-w-2xl -mt-48">
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-[11px] font-bold tracking-[0.28em] text-white sm:text-xs pointer-events-auto shadow-2xl">
                                <Zap className="w-4 h-4 mr-2 animate-bounce text-accent" /> NOW IN LUCKNOW
                            </span>
                            <h1 className="mt-8 text-5xl md:text-7xl font-poppins font-black tracking-tight text-white leading-[1.1]">
                                Turn Every Ride Into a <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-white drop-shadow-[0_0_15px_rgba(255,214,10,0.3)]">Billboard</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Cards Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black py-20">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-highlight/5 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Bento Box Layout */}
                            <div className="glass-panel p-8 md:col-span-2 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 group-hover:-translate-y-1 transition-all">
                                    <Map className="h-7 w-7 text-accent" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-3">Local Routes</h3>
                                <p className="text-gray-400 text-lg">Target offices, marketplaces, and residential zones with precision tracking.</p>
                            </div>
                            
                            <div className="glass-panel p-8 md:col-span-1 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 group-hover:-translate-y-1 transition-all">
                                    <TrendingUp className="h-7 w-7 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">High ROI</h3>
                                <p className="text-gray-400">Get noticed naturally in traffic.</p>
                            </div>

                            <div className="glass-panel p-8 md:col-span-1 group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-white/10 group-hover:-translate-y-1 transition-all">
                                    <Users className="h-7 w-7 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Reach</h3>
                                <p className="text-gray-400">Street level impact.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 glow-mesh opacity-30 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative background glow inside panel */}
                            <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                            
                            <div className="relative">
                                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-8">
                                    <div className="max-w-2xl">
                                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 flex items-center">
                                            <Target className="w-4 h-4 mr-2 text-accent" /> Live Dashboard
                                        </p>
                                        <h2 className="text-4xl md:text-5xl font-poppins font-black text-white tracking-tight">
                                            Monitor Your <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-accent to-white">Growth</span>
                                        </h2>
                                    </div>
                                    <div className="mt-6 md:mt-0 glass-pill px-6 py-2.5 text-sm font-bold text-white flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#4CAF50]"></div>
                                        System Active
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass-panel p-8 bg-white/[0.02]">
                                        <p className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wider">Active Campaign</p>
                                        <p className="text-2xl font-bold text-white mb-6">12 Cars in Lucknow</p>
                                        <div className="w-full h-32 rounded-2xl bg-gradient-to-r from-purple-500/20 to-accent/20 border border-white/5 relative overflow-hidden">
                                            {/* Abstract chart wave simulation */}
                                            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white/10 to-transparent rounded-t-[50%] blur-sm"></div>
                                        </div>
                                    </div>

                                    <div className="glass-panel p-8 bg-white/[0.02]">
                                        <p className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wider">Total Impressions</p>
                                        <div className="flex items-end gap-3 mb-6">
                                            <p className="text-6xl font-black text-white">56k</p>
                                            <p className="text-green-400 font-bold mb-2 flex items-center bg-green-400/10 px-2 py-1 rounded-lg text-sm"><TrendingUp className="w-4 h-4 mr-1"/> +12%</p>
                                        </div>
                                        <p className="text-base text-gray-500">Across 5 prime business districts</p>
                                    </div>

                                    <div className="glass-panel p-8 bg-white/[0.02] flex flex-col justify-between group hover:bg-white/5 cursor-pointer transition-all duration-300">
                                        <div>
                                            <p className="text-xl font-bold text-white mb-3">Creative Support</p>
                                            <p className="text-gray-400 leading-relaxed">End-to-end wrap tracking, design guidance, and dedicated manager included.</p>
                                        </div>
                                        <div className="mt-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                                            <ArrowRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section ref={processRef} className="py-24 bg-primary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <h2 className="text-sm font-semibold text-highlight tracking-widest uppercase mb-2">Process</h2>
                        <h3 className="text-4xl md:text-5xl font-poppins font-black text-white">Execution Path</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {[
                            { step: 1, title: 'Choose Your Reach', desc: 'Select coverage areas and wrapping types tailored for your goal.' },
                            { step: 2, title: 'Wrap & Accelerate', desc: 'We professionally wrap and deploy your fleet to target zones.' },
                            { step: 3, title: 'Monitor Impact', desc: 'Track performance with real-time location insights.' },
                        ].map((item, i) => {
                            const explodeClass = processVisible ? `animate-burst-${i + 1}` : "";
                            const floatClass = processVisible ? `animate-float-slow-${i + 1}` : "";
                            
                            return (
                                <div 
                                    key={i} 
                                    className={`group flex flex-col items-center text-center card-burst-item ${explodeClass}`}
                                    style={{ animationDelay: processVisible ? `${i * 0.15}s` : '0s' }}
                                >
                                    <div className={`flex flex-col items-center text-center ${floatClass}`}>
                                        <div className="relative w-24 h-24 mb-6">
                                            {/* Shockwave Burst Rings */}
                                            {processVisible && (
                                                <>
                                                    <div 
                                                        className="absolute inset-0 rounded-full border border-accent/60 animate-shockwave pointer-events-none" 
                                                        style={{ animationDelay: `${i * 0.15 + 1}s` }}
                                                    />
                                                    <div 
                                                        className="absolute inset-0 rounded-full bg-accent/5 blur-xl animate-shockwave pointer-events-none" 
                                                        style={{ animationDelay: `${i * 0.15 + 1}s` }}
                                                    />
                                                </>
                                            )}
                                            <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative w-full h-full rounded-2xl bg-black border-2 border-accent/30 group-hover:border-accent flex items-center justify-center text-3xl font-black text-accent transition-all group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,214,10,0.3)]">
                                                {item.step}
                                            </div>
                                        </div>
                                        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{item.title}</h4>
                                        <p className="text-gray-400 leading-relaxed px-4">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-black border-y border-gray-900 relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                            <h2 className="text-sm font-semibold text-highlight tracking-widest uppercase mb-2">The Advantage</h2>
                            <h3 className="text-3xl md:text-5xl font-poppins font-black text-white mb-6">Why Car Ads?</h3>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Static billboards blend into the background. Moving billboards naturally catch the eye, operate at eye-level, and target audiences wherever they go.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { icon: Map, title: 'Unmatched Reach', desc: "Go where billboards can't. Target residential areas and corporate parks." },
                                    { icon: TrendingUp, title: 'Higher ROI', desc: 'Generate more impressions per dollar compared to static placements.' },
                                    { icon: ShieldCheck, title: 'Verified Tracking', desc: 'Know exactly where your ads are traveling with GPS insights.' },
                                ].map((item, i) => (
                                    <div key={i} className="group flex items-start p-4 hover:bg-white/5 rounded-2xl transition-all">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gray-900 border border-gray-800 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all">
                                                <item.icon className="w-7 h-7" />
                                            </div>
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                            <div className="absolute -inset-10 bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
                            <div className="relative rounded-[2.5rem] bg-gray-900 border border-white/10 p-2 shadow-3xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                                <div 
                                    className="h-96 md:h-[40rem] rounded-[2rem] overflow-hidden bg-black flex items-center justify-center relative"
                                    onMouseMove={handlePreviewMouseMove}
                                    onMouseLeave={handlePreviewMouseLeave}
                                >
                                    <img
                                        className="w-full h-full object-contain transition-transform duration-150 ease-out"
                                        src="/live-wrap-preview.jpg"
                                        alt="Live Wrap Preview"
                                        style={{ transform: previewTransform }}
                                    />
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE WRAP PREVIEW</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-in fade-in zoom-in duration-1000">
                        <h2 className="text-sm font-semibold text-highlight tracking-widest uppercase mb-2">Impact</h2>
                        <h3 className="text-4xl md:text-5xl font-poppins font-black text-white">Client Success Stories</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: 'Ramesh Chandra', role: 'The Local Café', text: "We wrapped 5 cars targeting Hazratganj. Footfall increased by 40% in two months. Easily our best marketing investment." },
                            { name: 'Anita Kumar', role: 'FreshStart Tech', text: "As a startup, we needed rapid awareness. The car ads generated immediate trust and hundreds of sign-ups within weeks." },
                            { name: 'Vikram Singh', role: 'Urban Realtors', text: "Real estate needs local visibility. These cars acted as moving billboards, directly resulting in premium property queries." },
                        ].map((t, i) => (
                            <div key={i} className="group bg-black p-10 rounded-[2.5rem] border border-gray-800 relative z-0 overflow-hidden hover:border-accent/40 transition-all hover:-translate-y-2 shadow-2xl shadow-black">
                                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                <div className="flex items-center mb-8">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center font-black text-xl text-white group-hover:from-accent group-hover:to-yellow-500 group-hover:text-primary transition-all">
                                        {t.name[0]}
                                    </div>
                                    <div className="ml-5 text-left">
                                        <h4 className="text-white font-bold text-lg">{t.name}</h4>
                                        <p className="text-gray-500 text-sm font-medium">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic">
                                    "{t.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="bg-accent py-20 relative overflow-hidden group">
                {/* Moving background circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 group-hover:scale-125 transition-transform duration-1000"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl font-poppins font-black text-primary mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Ready to <span className="underline decoration-black/20 underline-offset-8">Rule</span> the Roads?
                    </h2>
                    <p className="text-2xl text-gray-800 mb-10 font-bold max-w-2xl mx-auto leading-tight">
                        Join the fastest-growing mobile advertising network in Lucknow.
                    </p>
                    <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white text-xl font-black rounded-2xl hover:bg-gray-900 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 active:scale-95">
                        Claim Your Presence <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
