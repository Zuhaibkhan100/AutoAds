'use client';

import { CheckCircle2, Car, Layers, PenTool, ArrowRight, Star, Shield, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
    return (
        <div className="pt-20 pb-24 relative overflow-hidden bg-primary min-h-screen">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-accent uppercase mb-6">
                        Expert Solutions
                    </span>
                    <h1 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6">Our <span className="text-accent underline decoration-accent/20 underline-offset-8">Services</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Choose the level of branding that best fits your marketing goals and budget. High-quality wrapping guaranteed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: Car,
                            title: 'Full Wrap',
                            desc: 'Maximum visibility. The entire vehicle becomes a moving masterpiece representing your brand perfectly.',
                            features: ['Highest impact & recall', '360-degree brand showcase', 'Premium auto-grade vinyl'],
                            premium: true
                        },
                        {
                            icon: Layers,
                            title: 'Partial Wrap',
                            desc: 'Strategic placement on doors and rear. The perfect balance of cost and visibility.',
                            features: ['Excellent ROI', 'Covers 50-70% of vehicle', 'Great for startups'],
                            premium: false
                        },
                        {
                            icon: PenTool,
                            title: 'Sticker Branding',
                            desc: 'Door panels and rear windshield. Cost-effective and minimal, yet highly noticeable.',
                            features: ['Most budget-friendly', 'Logo and contact focus', 'Quickest deployment'],
                            premium: false
                        }
                    ].map((service, idx) => (
                        <div 
                            key={idx}
                            className={`group relative bg-gradient-to-br from-gray-900 to-black border ${service.premium ? 'border-accent/40 shadow-[0_0_40px_rgba(255,214,10,0.15)]' : 'border-gray-800'} rounded-3xl p-8 transition-all duration-500 hover:-translate-y-4 hover:border-accent hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col`}
                        >
                            {service.premium && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="w-20 h-20 rounded-2xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-xl">
                                <service.icon className="w-10 h-10" />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-white mb-4 font-poppins group-hover:text-accent transition-colors">{service.title}</h2>
                            <p className="text-gray-400 mb-8 min-h-[80px] leading-relaxed">
                                {service.desc}
                            </p>
                            
                            <ul className="space-y-4 mb-10 flex-grow">
                                {service.features.map((f, i) => (
                                    <li key={i} className="flex items-center text-gray-300 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-3 group-hover:bg-accent/20 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote" className="w-full flex items-center justify-center px-6 py-4 rounded-xl font-bold bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Why Lucknow Section */}
                <div className="mt-32 relative rounded-[3rem] overflow-hidden border border-gray-800 bg-black/40 p-12 text-center animate-in fade-in zoom-in duration-1000">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,214,10,0.05),_transparent_70%)]"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-center gap-6 mb-8 text-accent/40">
                            <Trophy className="w-8 h-8" />
                            <Star className="w-8 h-8" />
                            <Shield className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6">Starting in <span className="text-accent italic">Lucknow</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                            We are currently covering key areas across Lucknow including <span className="text-white font-bold">Gomti Nagar</span>, <span className="text-white font-bold">Hazratganj</span>, and <span className="text-white font-bold">Alambagh</span>, guaranteeing your ads are seen in the most vibrant parts of the city.
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
