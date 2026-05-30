import { ArrowUpRight, Target, TrendingUp, Users } from 'lucide-react';

const CASE_STUDIES = [
    {
        id: 1,
        title: "How The Local Café Increased Footfall by 40%",
        client: "The Local Café",
        industry: "F&B",
        problem: "A newly opened hipster café in Hazratganj struggled to grab local attention against established competitors despite heavy social media spending.",
        strategy: "Deployed 5 fully-wrapped bright yellow hatchback cars circling prime residential sectors and college areas around Hazratganj for 3 months.",
        result: "Footfall increased by 40%. QR codes wrapped on the cars generated over 1,200 menu scans. A 2.5x ROI compared to their previous FB Ad spend.",
        metrics: [
            { label: "Footfall Increase", value: "+40%" },
            { label: "Menu Scans", value: "1.2k" },
            { label: "Duration", value: "3 Months" }
        ],
        color: "bg-yellow-500/10 text-yellow-500"
    },
    {
        id: 2,
        title: "Urban Realtors Launch Campaign",
        client: "Urban Realtors",
        industry: "Real Estate",
        problem: "Needed to target high net-worth individuals specifically in Gomti Nagar for an upcoming premium apartment launch.",
        strategy: "Premium black & gold partial wraps on 15 luxury cabs operating strictly in premium sectors and airport routes.",
        result: "Generated 340+ highly qualified leads. Sold 12 apartments directly attributed to the car ad campaign queries within the first month.",
        metrics: [
            { label: "Qualified Leads", value: "340+" },
            { label: "Direct Sales", value: "12 units" },
            { label: "Reach", value: "200k+" }
        ],
        color: "bg-blue-500/10 text-blue-500"
    }
];

export default function CaseStudies() {
    return (
        <div className="pt-20 pb-24 relative overflow-hidden min-h-screen">
            {/* Background Glows */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-[10px] font-black tracking-[0.3em] text-white uppercase mb-6 shadow-xl">
                        Proven Results
                    </span>
                    <h1 className="text-5xl md:text-7xl font-poppins font-black text-white mb-6">Case <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-white">Studies</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
                        Real results for real businesses. See how moving billboards create measurable impact and significant ROI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    {CASE_STUDIES.map((study, index) => {
                        const isPrimary = index % 2 === 0;
                        const spanClasses = isPrimary ? "lg:col-span-8" : "lg:col-span-4";
                        
                        return (
                            <div key={study.id} className={`glass-panel group relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 border border-white/10 hover:border-accent/30 shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-all duration-700 hover:-translate-y-2 ${spanClasses}`}>
                                {/* Background glow */}
                                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-1000 z-0 ${isPrimary ? 'bg-accent/10 group-hover:bg-accent/20' : 'bg-blue-500/10 group-hover:bg-blue-500/20'}`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="mb-8">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border ${isPrimary ? 'bg-accent/10 text-accent border-accent/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                            {study.industry} | {study.client}
                                        </div>
                                        <h2 className={`font-poppins font-black text-white mb-6 ${isPrimary ? 'text-4xl md:text-5xl leading-tight' : 'text-3xl'}`}>
                                            {study.title}
                                        </h2>
                                    </div>

                                    {isPrimary ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
                                            <div className="space-y-8">
                                                <div>
                                                    <h4 className="flex items-center text-red-400 font-bold mb-2 text-[10px] uppercase tracking-widest">
                                                        <Target className="w-4 h-4 mr-2" /> The Challenge
                                                    </h4>
                                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{study.problem}</p>
                                                </div>
                                                <div>
                                                    <h4 className="flex items-center text-accent font-bold mb-2 text-[10px] uppercase tracking-widest">
                                                        <Users className="w-4 h-4 mr-2" /> Our Strategy
                                                    </h4>
                                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{study.strategy}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <h4 className="flex items-center text-green-400 font-bold mb-2 text-[10px] uppercase tracking-widest">
                                                        <TrendingUp className="w-4 h-4 mr-2" /> The Result
                                                    </h4>
                                                    <p className="text-white font-medium text-sm md:text-base leading-relaxed mb-8">{study.result}</p>
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {study.metrics.map((metric, i) => (
                                                            <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-5 hover:border-accent/30 transition-colors">
                                                                <p className="text-3xl font-black text-accent font-poppins mb-1">{metric.value}</p>
                                                                <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black">{metric.label}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8 pt-6 border-t border-white/5">
                                                    <button className="flex items-center text-sm font-bold text-white group-hover:text-accent transition-colors">
                                                        View Full Report <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col h-full justify-between">
                                            <div>
                                                <h4 className="flex items-center text-green-400 font-bold mb-2 text-[10px] uppercase tracking-widest">
                                                    <TrendingUp className="w-4 h-4 mr-2" /> Overview
                                                </h4>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-8">{study.result}</p>
                                                
                                                <div className="space-y-4 mb-8">
                                                    {study.metrics.slice(0, 2).map((metric, i) => (
                                                        <div key={i} className="flex justify-between items-center bg-black/40 border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition-colors">
                                                            <p className="text-gray-500 text-[9px] uppercase tracking-widest font-black">{metric.label}</p>
                                                            <p className="text-2xl font-black text-blue-400 font-poppins">{metric.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <button className="flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors w-full p-4 bg-white/5 rounded-xl justify-center border border-white/5 hover:border-blue-500/30">
                                                Read Case Study <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
