'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Car,
    Layers,
    MapPin,
    Palette,
    BarChart3,
    ArrowRight,
    ChevronRight,
    Plus,
    Minus,
    Zap,
    Layout
} from 'lucide-react';
import Link from 'next/link';

const CAR_TYPES = [
    { id: '4-wheeler', name: '4 Wheeler Type', price: 3500, description: 'Standard cars and SUVs' },
    { id: '3-wheeler', name: '3 Wheeler Type', price: 1500, description: 'Auto rickshaws and similar' },
];

const PACKAGES = {
    '1month': { cars: 5, name: '1 Month' },
    '3months': { cars: 15, name: '3 Months' },
    '6months': { cars: 30, name: '6 Months' },
    'yearly': { cars: 50, name: 'Yearly' },
};

function QuotePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pkg = searchParams.get('package') || 'starter';

    const [selection, setSelection] = useState({
        carType: '4-wheeler',
        carsCount: PACKAGES[pkg as keyof typeof PACKAGES]?.cars || 5,
        isCustomCars: false,
        customCarsInput: '',
        zones: [] as string[],
        isPanCity: pkg === 'yearly' || pkg === '6months',
        designAssistance: pkg !== '1month',
        tracking: {
            qr: pkg === 'yearly' || pkg === '6months',
            api: pkg === 'yearly',
            reporting: 'monthly'
        }
    });

    useEffect(() => {
        // Calculation logic removed as pricing is now exclusively discussed via WhatsApp
    }, [selection]);

    const zones = ['Hazratganj', 'Gomti Nagar', 'Aliganj', 'Indira Nagar', 'Vikas Nagar', 'Janki Puram'];

    const toggleZone = (zone: string) => {
        if (selection.zones.includes(zone)) {
            setSelection({ ...selection, zones: selection.zones.filter(z => z !== zone) });
        } else {
            setSelection({ ...selection, zones: [...selection.zones, zone] });
        }
    };

    const handleContinue = () => {
        const params = new URLSearchParams();
        params.set('carType', selection.carType);
        params.set('cars', selection.isCustomCars ? selection.customCarsInput : selection.carsCount.toString());
        params.set('zones', selection.isPanCity ? 'Pan-City' : selection.zones.join(', '));
        params.set('design', selection.designAssistance ? 'Yes' : 'No');
        params.set('tracking', Object.entries(selection.tracking)
            .filter(([k, v]) => v === true || typeof v === 'string')
            .map(([k, v]) => k === 'reporting' ? `Reporting: ${v}` : k.toUpperCase())
            .join(', '));

        router.push(`/contact?${params.toString()}`);
    };

    return (
        <div className="pt-20 pb-24 min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-64 -mb-64 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    <Link href="/pricing" className="text-gray-400 hover:text-accent flex items-center mb-4 transition-colors">
                        <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> Back to Pricing
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-poppins font-black">Customize Your Campaign</h1>
                    <p className="text-gray-400 mt-2">Tailor every detail to match your business goals.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Options */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Car Type */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent mr-4">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">1. Car Type</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {CAR_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelection({ ...selection, carType: type.id })}
                                        className={`text-left p-5 rounded-2xl border-2 transition-all ${selection.carType === type.id
                                            ? 'border-accent bg-accent/5 ring-1 ring-accent'
                                            : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`font-bold ${selection.carType === type.id ? 'text-accent' : 'text-white'}`}>
                                                {type.name}
                                            </span>
                                            {selection.carType === type.id && <Zap className="w-4 h-4 text-accent fill-accent" />}
                                        </div>
                                        <p className="text-sm text-gray-400">{type.description}</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Campaign Scale */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 mr-4">
                                    <Car className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">2. Campaign Scale</h2>
                            </div>
                            <div className="flex flex-wrap gap-4 mb-4">
                                {[5, 15, 50].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setSelection({ ...selection, carsCount: num, isCustomCars: false })}
                                        className={`px-8 py-4 rounded-xl border-2 font-bold transition-all ${!selection.isCustomCars && selection.carsCount === num
                                            ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                                            : 'border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700'
                                            }`}
                                    >
                                        {num === 50 ? '50+' : num} Cars
                                    </button>
                                ))}
                                <button
                                    onClick={() => setSelection({ ...selection, isCustomCars: true })}
                                    className={`px-8 py-4 rounded-xl border-2 font-bold transition-all ${selection.isCustomCars
                                        ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                                        : 'border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700'
                                        }`}
                                >
                                    Other
                                </button>
                            </div>
                            {selection.isCustomCars && (
                                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                    <input
                                        type="number"
                                        placeholder="Enter fleet size"
                                        value={selection.customCarsInput}
                                        onChange={(e) => setSelection({ ...selection, customCarsInput: e.target.value })}
                                        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:border-blue-500 outline-none w-48"
                                    />
                                    <span className="text-gray-400">Total Cars</span>
                                </div>
                            )}
                        </section>

                        {/* Coverage Area */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 mr-4">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">3. Coverage Area</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button
                                    onClick={() => setSelection({ ...selection, isPanCity: true, zones: [] })}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all ${selection.isPanCity
                                        ? 'border-green-500 bg-green-500/10'
                                        : 'border-gray-800 bg-gray-900/50'
                                        }`}
                                >
                                    <h3 className={`font-bold mb-1 ${selection.isPanCity ? 'text-green-500' : 'text-white'}`}>Pan-City Coverage</h3>
                                    <p className="text-sm text-gray-400">Target all major high-traffic routes in LKO.</p>
                                </button>
                                <button
                                    onClick={() => setSelection({ ...selection, isPanCity: false })}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all ${!selection.isPanCity
                                        ? 'border-green-500 bg-green-500/10'
                                        : 'border-gray-800 bg-gray-900/50'
                                        }`}
                                >
                                    <h3 className={`font-bold mb-1 ${!selection.isPanCity ? 'text-green-500' : 'text-white'}`}>Target Specific Zones</h3>
                                    <p className="text-sm text-gray-400">Select up to 5 zones for hyper-local impact.</p>
                                </button>
                            </div>

                            {!selection.isPanCity && (
                                <div className="mt-6 flex flex-wrap gap-2 animate-in fade-in fill-mode-both">
                                    {zones.map(zone => (
                                        <button
                                            key={zone}
                                            onClick={() => toggleZone(zone)}
                                            className={`px-4 py-2 rounded-full border text-sm transition-all ${selection.zones.includes(zone)
                                                ? 'bg-green-500 border-green-500 text-black font-bold'
                                                : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-green-500/50'
                                                }`}
                                        >
                                            {zone}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Tracking & Data */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500 mr-4">
                                    <BarChart3 className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">4. Tracking & Reporting</h2>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl cursor-pointer hover:bg-gray-900 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selection.tracking.qr}
                                        onChange={(e) => setSelection({ ...selection, tracking: { ...selection.tracking, qr: e.target.checked } })}
                                        className="w-5 h-5 accent-purple-500"
                                    />
                                    <div>
                                        <p className="font-bold">QR Code CTA Integration</p>
                                        <p className="text-xs text-gray-400">Track conversion rates from physical scans.</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl cursor-pointer hover:bg-gray-900 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selection.tracking.api}
                                        onChange={(e) => setSelection({ ...selection, tracking: { ...selection.tracking, api: e.target.checked } })}
                                        className="w-5 h-5 accent-purple-500"
                                    />
                                    <div>
                                        <p className="font-bold">API Dashboard Access</p>
                                        <p className="text-xs text-gray-400">Integrate campaign data into your own marketing stack.</p>
                                    </div>
                                </label>

                                <div className="pt-2">
                                    <p className="text-sm font-medium text-gray-400 mb-2">Reporting Type</p>
                                    <select
                                        value={selection.tracking.reporting}
                                        onChange={(e) => setSelection({ ...selection, tracking: { ...selection.tracking, reporting: e.target.value } })}
                                        className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 focus:border-purple-500 outline-none"
                                    >
                                        <option value="monthly">Monthly Summary</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Design Preferences */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 mr-4">
                                    <Palette className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold">5. Design Preferences</h2>
                            </div>
                            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
                                <label className="flex items-center gap-3 mb-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selection.designAssistance}
                                        onChange={(e) => setSelection({ ...selection, designAssistance: e.target.checked })}
                                        className="w-5 h-5 accent-orange-500"
                                    />
                                    <span className="font-bold">I need professional design assistance</span>
                                </label>

                                <p className="text-sm text-gray-400 mb-2">Base Brand Color</p>
                                <div className="flex gap-3 mb-6 flex-wrap">
                                    {['#FFD60A', '#3B82F6', '#EF4444', '#10B981', '#FFFFFF', '#000000'].map(color => (
                                        <div
                                            key={color}
                                            className="w-10 h-10 rounded-full border-2 border-gray-700 cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center cursor-pointer flex-shrink-0">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center flex flex-col items-center">
                                    <Layout className="w-10 h-10 text-gray-600 mb-3" />
                                    <p className="text-sm text-gray-400">Upload your logo/brand assets</p>
                                    <p className="text-xs text-gray-600 mt-1">PNG, SVG, AI, PSD (Max 20MB)</p>
                                    <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="lg:block">
                        <div className="sticky top-24">
                            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-3">
                                    <div className="w-12 h-12 bg-accent/10 rounded-full blur-xl flex items-center justify-center"></div>
                                </div>

                                <h3 className="text-xl font-bold mb-6">Campaign Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Car Type</span>
                                        <span className="text-white font-medium">{CAR_TYPES.find(t => t.id === selection.carType)?.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Scale</span>
                                        <span className="text-white font-medium">
                                            {selection.isCustomCars ? selection.customCarsInput || 0 : selection.carsCount} Cars
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Coverage</span>
                                        <span className="text-white font-medium">
                                            {selection.isPanCity ? 'Pan-City' : `${selection.zones.length || 0} Zones`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Design Aid</span>
                                        <span className="text-white font-medium">{selection.designAssistance ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-800 mb-8 text-center">
                                    <p className="text-sm font-bold text-accent mb-2">Pricing based on custom needs</p>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        Proceed to contact our team directly via WhatsApp to discuss materials and get your final tailored estimate.
                                    </p>
                                </div>

                                <button
                                    onClick={handleContinue}
                                    className="w-full py-4 bg-accent text-primary font-black rounded-2xl flex items-center justify-center group hover:bg-yellow-400 transition-all shadow-[0_10px_20px_rgba(255,214,10,0.2)]"
                                >
                                    Finish & Finalize <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-center text-xs text-gray-500 mt-4">
                                    No obligation to buy. We will review your selections.
                                </p>
                            </div>

                            <div className="mt-6 flex items-center gap-4 px-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800"></div>
                                    ))}
                                </div>
                                <p className="text-[11px] text-gray-400">Join 124+ brands advertising in Lucknow this month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function QuotePage() {
    return (
        <Suspense
            fallback={
                <div className="pt-20 pb-24 min-h-screen bg-black text-white flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin"></div>
                </div>
            }
        >
            <QuotePageContent />
        </Suspense>
    );
}
