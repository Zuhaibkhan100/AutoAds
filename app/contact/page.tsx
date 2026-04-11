'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

function ContactForm() {
    const searchParams = useSearchParams();
    
    // Extract quote data from search params if present
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
        
        // Generate WhatsApp Message
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
                        wrapType: quoteData.wrapType || undefined,
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
        
        // Redirect to WhatsApp after a short delay to show success state
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-black border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 overflow-hidden">
                {/* Visual accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                {submitted ? (
                    <div className="text-center py-16 animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Redirecting to WhatsApp...</h3>
                        <p className="text-gray-400">Please wait while we open your chat with our campaign strategist.</p>
                    </div>
                ) : (
                    <>
                        {isQuoteFlow && (
                            <div className="mb-10 p-6 bg-accent/10 border border-accent/20 rounded-2xl relative">
                                <span className="absolute -top-3 left-6 px-3 py-1 bg-accent text-primary text-[10px] font-black rounded-full uppercase tracking-widest flex items-center">
                                    <ShoppingBag className="w-3 h-3 mr-1" /> Selected Quote
                                </span>
                                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                    <div>
                                        <p className="text-gray-500 text-xs">Wrap & Scale</p>
                                        <p className="text-white font-medium">{quoteData.wrapType} • {quoteData.cars} Cars</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-xs">Price Estimate</p>
                                        <p className="text-accent font-bold text-xs uppercase tracking-wider">To be discussed</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp Number</label>
                                    <input
                                        required
                                        type="tel"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Business Type</label>
                                    <select
                                        required
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-accent transition-colors appearance-none"
                                        value={formData.businessType}
                                        onChange={e => setFormData({ ...formData, businessType: e.target.value })}
                                    >
                                        <option value="">Select an option</option>
                                        <option value="Restaurant/Cafe">Restaurant / Cafe</option>
                                        <option value="Startup">Startup / Tech</option>
                                        <option value="Real Estate">Real Estate</option>
                                        <option value="Healthcare">Healthcare / Clinic</option>
                                        <option value="Education">Education Institute</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder="E.g. 50k/month"
                                        value={formData.budget}
                                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tell us about your campaign goals</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="E.g., I want to increase footfall to my new cafe in Hazratganj..."
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-accent text-primary font-bold text-lg py-4 rounded-xl hover:bg-yellow-400 transition-colors flex justify-center items-center group">
                                    Send Request <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-[0.2em] font-bold">
                                    Direct flow to WhatsApp Business
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </div>

            <div className="flex flex-col justify-center space-y-12 lg:pl-10">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Direct Contact</h3>
                    <div className="space-y-6">
                        <a href="https://wa.me/919454420712" target="_blank" rel="noreferrer" className="flex items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors text-xl">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-medium text-white group-hover:text-green-500 transition-colors">WhatsApp Us</p>
                                <p className="text-gray-400">+91 94544 20712</p>
                            </div>
                        </a>

                        <a href="mailto:autoads.marketing@gmail.com" className="flex items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-medium text-white group-hover:text-blue-500 transition-colors">Email Us</p>
                                <p className="text-gray-400">autoads.marketing@gmail.com</p>
                            </div>
                        </a>

                        <div className="flex items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-medium text-white group-hover:text-accent transition-colors">Lucknow HQ</p>
                                <p className="text-gray-400 break-words w-48">VikasNagar,Lucknow, UP 226024</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ShoppingBag className="w-16 h-16 text-accent" />
                    </div>
                    <h4 className="font-bold text-white mb-2">Fast Response Guarantee</h4>
                    <p className="text-gray-400 text-sm">We process all inquiries within 24 hours. Connect on WhatsApp for fastest response!</p>
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <div className="pt-20 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-poppins font-black text-white mb-6 animate-in slide-in-from-bottom-4">Let's Get Your Brand Moving</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Fill out the form below to finalize your quote and connect with our team on WhatsApp.
                    </p>
                </div>

                <Suspense fallback={<div className="text-center text-gray-500 py-20">Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </div>
    );
}
