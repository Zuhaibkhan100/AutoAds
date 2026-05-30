'use client';

import { CheckCircle2, Car, Layers, PenTool, ArrowRight, Star, Shield, Trophy, Activity, Navigation, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
    return (
        <div className="pt-20 pb-24 relative overflow-hidden bg-primary min-h-screen">
            {/* Fluid / Glow Backgrounds */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse duration-10000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-[10px] font-black tracking-[0.3em] text-white uppercase mb-6 shadow-xl">
                        Expert Solutions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6">Our <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-white">Services</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Choose the level of branding that best fits your marketing goals and budget. Texts of Assurity.
                    </p>
                </div>

                {/* Main Bento Central Feature (Full Wrap) */}
                <div className="relative max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {/* Central Glass Panel */}
                    <div className="glass-panel p-10 md:p-16 relative overflow-hidden group border border-white/10 hover:border-accent/30 transition-all duration-700 shadow-3xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/90 z-0"></div>
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] group-hover:bg-accent/10 transition-all duration-700 z-0"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <div className="inline-block px-4 py-1 rounded-full bg-accent text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                                    Flagship Service
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 font-poppins">Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Wrap</span></h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Maximum visibility. The entire vehicle becomes a moving masterpiece representing your brand perfectly. Dominates the streets and commands attention.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {['Highest impact & recall', '360-degree brand showcase', 'Premium auto-grade vinyl'].map((f, i) => (
                                        <li key={i} className="flex items-center text-gray-300 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mr-4">
                                                <CheckCircle2 className="w-3 h-3 text-accent" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/quote" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-white text-black hover:bg-accent hover:text-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,214,10,0.4)]">
                                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                            <div className="w-full md:w-1/3 flex justify-center">
                                <div className="w-48 h-48 rounded-[2.5rem] bg-gradient-to-tr from-gray-900 to-black border border-white/5 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-700 relative">
                                    <Car className="w-20 h-20 text-accent drop-shadow-[0_0_15px_rgba(255,214,10,0.5)]" />
                                    
                                    {/* Floating Widgets aligned inside the card */}
                                    <div className="hidden lg:flex absolute -top-6 -left-12 glass-pill px-4 py-2 items-center gap-2 animate-[bounce_4s_infinite] shadow-2xl z-20">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-accent" />
                                        </div>
                                        <span className="text-white font-bold text-xs tracking-widest uppercase">High ROI</span>
                                    </div>
                                    
                                    <div className="hidden lg:flex absolute -bottom-6 -right-12 glass-pill px-4 py-2 items-center gap-2 animate-[bounce_5s_infinite_0.5s] shadow-2xl z-20">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <Navigation className="w-4 h-4 text-blue-400" />
                                        </div>
                                        <span className="text-white font-bold text-xs tracking-widest uppercase">GPS Tracked</span>
                                    </div>

                                    <div className="hidden lg:flex absolute top-1/2 -left-16 -translate-y-1/2 glass-pill px-4 py-2 items-center gap-2 animate-[bounce_4.5s_infinite_1s] shadow-2xl z-20">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                            <Smartphone className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="text-white font-bold text-xs tracking-widest uppercase">Live Dash</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    {[
                        {
                            icon: Layers,
                            title: 'Partial Wrap',
                            desc: 'Strategic placement on doors and rear. The perfect balance of cost and visibility.',
                            features: ['Excellent ROI', 'Covers 50-70% of vehicle']
                        },
                        {
                            icon: PenTool,
                            title: 'Sticker Branding',
                            desc: 'Door panels and rear windshield. Cost-effective and minimal, yet highly noticeable.',
                            features: ['Most budget-friendly', 'Quickest deployment']
                        }
                    ].map((service, idx) => (
                        <div key={idx} className="glass-panel p-10 group hover:-translate-y-2 transition-all duration-500 hover:border-white/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors z-0"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/20 transition-all">
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 mb-6 min-h-[60px]">{service.desc}</p>
                                <ul className="space-y-3">
                                    {service.features.map((f, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-500">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-gray-600" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Why Lucknow Section */}
                <div className="mt-32 relative glass-panel p-12 text-center overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,214,10,0.05),_transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,_rgba(255,214,10,0.08),_transparent_70%)] transition-all duration-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex justify-center gap-6 mb-8 text-accent/40">
                            <Trophy className="w-8 h-8" />
                            <Star className="w-8 h-8" />
                            <Shield className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6">Starting in <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Lucknow</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                            We are currently covering key areas across Lucknow including <span className="text-white font-bold">Gomti Nagar</span>, <span className="text-white font-bold">Hazratganj</span>, and <span className="text-white font-bold">Alambagh</span>. Texts of Assurity.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-lg font-black rounded-2xl text-primary bg-accent hover:bg-yellow-400 transition-all shadow-2xl shadow-accent/20 hover:-translate-y-1 active:scale-95">
                            Check Availability <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
