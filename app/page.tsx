import Link from 'next/link';
import { ShieldCheck, Map, TrendingUp, ArrowRight, Quote, Users, Zap, Target, Star } from 'lucide-react';
import HeroScene from './components/HeroScene';

export default function Home() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-br from-black via-gray-950 to-black">
                <HeroScene />
                
                {/* Floating Decorative SVGs */}
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-highlight/5 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
                
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.15))] pointer-events-none z-0"></div>
                <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(255,214,10,0.2),_transparent_65%)] pointer-events-none z-0"></div>
                <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-28">
                    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-left-8 duration-1000">
                        <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-[11px] font-bold tracking-[0.28em] text-accent sm:text-xs">
                            <Zap className="w-3 h-3 mr-2 animate-bounce" /> NOW IN LUCKNOW
                        </span>
                        <h1 className="mt-6 text-4xl font-poppins font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
                            Turn Every Ride Into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-300 to-white drop-shadow-[0_0_15px_rgba(255,214,10,0.3)]">Billboard</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
                            Launch car advertising campaigns that stay visible in traffic, reach local neighborhoods, and make your brand impossible to miss.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link href="/contact" className="group/btn relative inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-base font-bold text-primary shadow-[0_0_20px_rgba(255,214,10,0.28)] transition-all hover:bg-yellow-400 hover:scale-105 active:scale-95">
                                <span className="relative z-10 flex items-center">
                                    Get Your Brand on the Road <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                            </Link>
                            <Link href="/portfolio" className="inline-flex items-center justify-center rounded-xl border border-gray-700 bg-black/40 px-8 py-4 text-base font-semibold text-white transition-all hover:border-accent hover:bg-accent/5 hover:text-accent">
                                See Live Campaigns
                            </Link>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {[
                                { icon: Map, title: 'Local Routes', desc: 'Target offices, marketplaces, and residential zones.' },
                                { icon: TrendingUp, title: 'Higher Recall', desc: 'Moving ads get noticed more naturally than static.' },
                                { icon: Users, title: 'Street Reach', desc: 'Stay visible where your customers commute.' },
                            ].map((item, i) => (
                                <div key={i} className="group p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-white/10">
                                    <div className="flex items-center gap-3 text-accent group-hover:scale-110 transition-transform">
                                        <item.icon className="h-5 w-5" />
                                        <span className="text-sm font-semibold text-white">{item.title}</span>
                                    </div>
                                    <p className="mt-3 text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-6 group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,214,10,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(58,134,255,0.18),_transparent_45%)] transition-all duration-1000 group-hover:scale-110"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/80 flex items-center">
                                            <Star className="w-3 h-3 mr-2" /> Campaign Snapshot
                                        </p>
                                        <h2 className="mt-2 text-2xl font-poppins font-bold text-white">Built for crowded streets</h2>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
                                        <div className="relative rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                                            Live
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 hover:border-accent/20 transition-all">
                                        <p className="text-sm text-gray-400">Popular Campaign</p>
                                        <p className="mt-2 text-xl font-bold text-white">12 branded cars across Lucknow</p>
                                        <p className="mt-2 text-sm leading-6 text-gray-300">Optimized for peak hour exposure in high-intent business districts.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 group/snap">
                                            <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Impressions</p>
                                            <p className="mt-2 text-3xl font-black text-white group-hover/snap:text-accent transition-colors">10k+</p>
                                            <p className="mt-1 text-xs text-gray-400">Daily street views</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 group/snap">
                                            <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Zones</p>
                                            <p className="mt-2 text-3xl font-black text-white group-hover/snap:text-highlight transition-colors">5</p>
                                            <p className="mt-1 text-xs text-gray-400">Prime districts</p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 group/link flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-all">
                                        <div>
                                            <p className="text-sm font-semibold text-white">Full Creative Support</p>
                                            <p className="mt-1 text-xs text-gray-400">Wrap guidance and tracking included.</p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover/link:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 bg-primary relative overflow-hidden">
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
                        ].map((item, i) => (
                            <div key={i} className="group flex flex-col items-center text-center">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative w-full h-full rounded-2xl bg-black border-2 border-accent/30 group-hover:border-accent flex items-center justify-center text-3xl font-black text-accent transition-all group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,214,10,0.3)]">
                                        {item.step}
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed px-4">{item.desc}</p>
                            </div>
                        ))}
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
                                <div className="h-64 md:h-96 rounded-[2rem] overflow-hidden bg-black flex items-center justify-center relative">
                                    <video
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        src="/car_video.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
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
