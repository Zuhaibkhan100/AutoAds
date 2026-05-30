'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';

function ContactForm() {
    const searchParams = useSearchParams();

    const quoteData = {
        carType: searchParams.get('carType') || '',
        cars: searchParams.get('cars') || '',
        zones: searchParams.get('zones') || '',
        design: searchParams.get('design') || '',
        tracking: searchParams.get('tracking') || '',
    };

    const isQuoteFlow = !!quoteData.carType;

    const [formData, setFormData] = useState({
        name: '',
        businessType: '',
        budget: '',
        message: '',
        phone: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const phoneNumber = '919454420712';
        let messageText = `🚀 *New Campaign Inquiry - AutoAds*\n\n`;
        messageText += `*Client Information:*\n`;
        messageText += `👤 Name: ${formData.name}\n`;
        messageText += `🏢 Business: ${formData.businessType}\n`;
        messageText += `💰 Budget: ${formData.budget}\n`;
        messageText += `📞 Phone: ${formData.phone}\n`;

        if (isQuoteFlow) {
            messageText += `\n*📊 Campaign Configuration:*\n`;
            messageText += `🚗 Vehicle: ${quoteData.carType === '3-wheeler' ? '3 Wheeler (Auto)' : '4 Wheeler (Car/SUV)'}\n`;
            messageText += `🔢 Fleet Size: ${quoteData.cars} Cars\n`;
            messageText += `📍 Coverage: ${quoteData.zones}\n`;
            messageText += `🎨 Design Support: ${quoteData.design}\n`;
            messageText += `🔍 Tracking: ${quoteData.tracking || 'Standard'}\n`;
        }

        if (formData.message) {
            messageText += `\n*📝 Additional Goals:*\n${formData.message}`;
        }

        const encodedMessage = encodeURIComponent(messageText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        const logSubmission = async () => {
            try {
                await fetch('/api/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'submission',
                        package: searchParams.get('package') || 'custom',
                        carType: quoteData.carType || undefined,
                        carsCount: quoteData.cars || undefined,
                        userName: formData.name,
                        phoneNumber: formData.phone,
                        businessType: formData.businessType,
                    }),
                });
            } catch (e) {
                console.error('Failed to log submission', e);
            }
        };

        setSubmitted(true);
        logSubmission();

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    };

    return (
        <div className="bg-transparent rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden group/card">
            {/* Magnifying/Zoomed Background Video */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover scale-[1.3] opacity-80"
                >
                    <source src="/ink_plumes.mp4" type="video/mp4" />
                </video>
                {/* Dark overlay specifically inside the card to keep text highly readable */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {submitted ? (
                <div className="text-center py-16 animate-in zoom-in duration-500 relative z-10">
                    <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-3xl font-black text-white font-poppins mb-2">Connecting...</h3>
                    <p className="text-white/70">Redirecting to our strategy team.</p>
                </div>
            ) : (
                <div className="relative z-10 animate-in fade-in duration-1000">
                    <h2 className="text-2xl font-bold text-white mb-6">Start a Project</h2>
                    
                    {isQuoteFlow && (
                        <div className="mb-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
                            <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Active Quote Request</p>
                            <p className="text-white font-medium text-sm">{quoteData.carType === '3-wheeler' ? '3 Wheeler (Auto)' : '4 Wheeler (Car/SUV)'} • {quoteData.cars} Cars</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                required 
                                type="text" 
                                placeholder="Name" 
                                className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent/40 focus:bg-black/50 transition-all" 
                                value={formData.name} 
                                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                            />
                            <input 
                                required 
                                type="tel" 
                                placeholder="Phone" 
                                className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent/40 focus:bg-black/50 transition-all" 
                                value={formData.phone} 
                                onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                required 
                                className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-accent/40 focus:bg-black/50 transition-all appearance-none" 
                                value={formData.businessType} 
                                onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                            >
                                <option value="" className="bg-gray-900">Industry</option>
                                <option value="Restaurant" className="bg-gray-900">Restaurant</option>
                                <option value="Startup" className="bg-gray-900">Startup</option>
                                <option value="Real Estate" className="bg-gray-900">Real Estate</option>
                                <option value="Other" className="bg-gray-900">Other</option>
                            </select>
                            <input 
                                required 
                                type="text" 
                                placeholder="Budget" 
                                className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent/40 focus:bg-black/50 transition-all" 
                                value={formData.budget} 
                                onChange={e => setFormData({ ...formData, budget: e.target.value })} 
                            />
                        </div>

                        <textarea 
                            rows={3} 
                            placeholder="Message or Campaign Goals..." 
                            className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent/40 focus:bg-black/50 transition-all resize-none" 
                            value={formData.message} 
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>

                        <button type="submit" className="w-full bg-accent text-primary font-black py-3.5 rounded-xl hover:bg-yellow-400 transition-colors flex justify-center items-center gap-2 mt-2 shadow-[0_10px_20px_rgba(255,214,10,0.15)] hover:shadow-[0_15px_30px_rgba(255,214,10,0.3)]">
                            Send Request <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default function Contact() {
    return (
        <div className="min-h-screen bg-primary p-4 md:p-8 flex items-center justify-center pt-28 pb-16 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 glow-mesh opacity-40 pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[10s]"></div>
            
            {/* Massive inner container */}
            <div className="relative w-full min-h-[calc(100vh-10rem)] lg:h-[calc(100vh-10rem)] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col group z-10">
                
                {/* Background Video */}
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[20s] group-hover:scale-110"
                >
                    <source src="/ink_plumes.mp4" type="video/mp4" />
                </video>

                {/* Subtle Overlay to make text readable */}
                <div className="absolute inset-0 bg-black/25 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>

                {/* Main Content Area */}
                <div className="relative z-10 flex-1 flex flex-col lg:flex-row p-8 md:p-12 lg:py-16 w-full gap-12">
                    
                    {/* Left: Typography */}
                    <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                        <div className="mb-4">
                            <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-poppins font-black text-white leading-none tracking-tighter uppercase mb-4 drop-shadow-2xl flex flex-wrap items-baseline">
                                Contact
                                <span className="text-3xl md:text-5xl align-super ml-2 text-accent drop-shadow-lg font-serif">®</span>
                            </h1>
                            <div className="flex items-center gap-4 text-white/80 max-w-sm pl-4 border-l-2 border-white/30">
                                <p className="text-sm md:text-base font-medium leading-relaxed">
                                    We craft futuristic campaigns where physical reach and visual storytelling merge into one seamless flow.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="w-full lg:w-[450px] flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                        <Suspense fallback={<div className="text-white animate-pulse">Loading contact details...</div>}>
                            <ContactForm />
                        </Suspense>
                    </div>

                </div>
            </div>
        </div>
    );
}
