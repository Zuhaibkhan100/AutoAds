'use client';

import { useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, MapPin, Calendar, ExternalLink } from 'lucide-react';

const CATEGORIES = ["All", "Restaurant", "Real Estate", "Startup", "Retail", "Healthcare", "Education"];

interface CampaignItem {
    id: string;
    client: string;
    type: string;
    category: string;
    desc: string;
    imageUrl: string;
    publicId: string;
    createdAt: string;
}

export default function Portfolio() {
    const [filter, setFilter] = useState("All");
    const [allWork, setAllWork] = useState<CampaignItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadMessage, setLoadMessage] = useState('');

    const getLegacyCampaigns = (): CampaignItem[] => {
        try {
            const saved = localStorage.getItem('autoads_portfolio');
            if (!saved) return [];

            const parsed = JSON.parse(saved);
            if (!Array.isArray(parsed)) return [];

            return parsed
                .filter((item): item is Partial<CampaignItem> => Boolean(item))
                .map((item) => ({
                    id: String(item.id ?? item.publicId ?? Date.now()),
                    client: item.client ?? '',
                    type: item.type ?? '',
                    category: item.category ?? '',
                    desc: item.desc ?? '',
                    imageUrl: item.imageUrl ?? '',
                    publicId: item.publicId ?? '',
                    createdAt: item.createdAt ?? new Date().toISOString(),
                }))
                .filter((item) => item.client && item.type && item.category && item.desc && item.imageUrl && item.publicId);
        } catch {
            return [];
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadCampaigns = async () => {
            try {
                const res = await fetch('/api/campaigns', { cache: 'no-store' });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Failed to load campaigns');
                }

                if (isMounted) {
                    setAllWork(data.campaigns || []);
                    setLoadMessage('');
                }
            } catch (error) {
                console.error('Portfolio load error:', error);

                try {
                    const legacyCampaigns = getLegacyCampaigns();
                    if (legacyCampaigns.length > 0 && isMounted) {
                        setAllWork(legacyCampaigns);
                        setLoadMessage('Showing campaigns saved in this browser only.');
                        return;
                    }
                } catch {
                }

                if (isMounted) {
                    setLoadMessage('Unable to load campaigns right now.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadCampaigns();

        return () => {
            isMounted = false;
        };
    }, []);

    const filteredItems = allWork.filter(item => filter === "All" || item.category === filter);

    return (
        <div className="pt-20 pb-24 relative overflow-hidden min-h-screen">
             {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6">Execution <span className="text-accent">Excellence</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium">
                        We transform ordinary vehicles into high-impact mobile billboards that capture attention and drive results.
                    </p>
                </div>

                {loadMessage && (
                    <div className="mb-8 max-w-md mx-auto rounded-2xl border px-4 py-3 text-center text-sm border-yellow-500/20 bg-yellow-500/5 text-yellow-500/80">
                        {loadMessage}
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                filter === cat 
                                ? 'bg-accent text-primary shadow-[0_10px_20px_rgba(255,214,10,0.3)] scale-110 active:scale-95' 
                                : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800/50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {isLoading && (
                    <div className="py-20 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-full border-4 border-accent/20 border-t-accent animate-spin"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Loading gallery...</p>
                    </div>
                )}

                {/* Gallery Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredItems.map((item, idx) => (
                        <div 
                            key={item.id} 
                            className="group h-[450px] [perspective:1000px]"
                        >
                            <div className="relative h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-2xl">
                                
                                {/* Front Side */}
                                <div className="absolute inset-0 h-full w-full rounded-3xl [backface-visibility:hidden] overflow-hidden border border-gray-800 bg-gray-900">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.client} />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                            <ImageIcon className="w-12 h-12 text-gray-800" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <span className="inline-block py-1 px-3 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg">
                                            {item.category}
                                        </span>
                                        <h3 className="text-3xl font-black text-white font-poppins">{item.client}</h3>
                                        <div className="flex items-center text-gray-400 text-xs mt-2 font-bold uppercase tracking-tighter">
                                            <MapPin className="w-3 h-3 mr-1 text-accent outline-none" /> Area Coverage
                                        </div>
                                    </div>
                                    
                                    {/* Tap instruction for mobile */}
                                    <div className="absolute top-4 right-4 md:hidden bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20">
                                        <ExternalLink className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Back Side (The result of flipping) */}
                                <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between border-2 border-accent/20">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-2xl font-bold text-accent">{item.client}</h3>
                                            <Calendar className="w-5 h-5 text-gray-600" />
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Campaign Type</p>
                                                <p className="text-white font-medium">{item.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Impact Description</p>
                                                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-px bg-gray-800 w-full"></div>
                                        <button className="flex items-center justify-center w-full py-3 bg-accent/10 border border-accent/30 text-accent rounded-xl font-bold hover:bg-accent hover:text-primary transition-all duration-300">
                                            <Camera className="w-4 h-4 mr-2" /> View More Shots
                                        </button>
                                    </div>
                                    
                                    {/* Decorative SVG */}
                                    <div className="absolute bottom-4 right-4 opacity-5">
                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                             <circle cx="12" cy="12" r="10"></circle>
                                             <line x1="12" y1="8" x2="12" y2="16"></line>
                                             <line x1="8" y1="12" x2="16" y2="12"></line>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}

                {!isLoading && filteredItems.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-xl font-medium">No campaigns found for this category yet.</p>
                        <button onClick={() => setFilter("All")} className="mt-4 text-accent hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
}
