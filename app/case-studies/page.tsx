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
        <div className="pt-20 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-poppins font-black text-white mb-6">Case Studies</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Real results for real businesses. See how moving billboards create measurable impact and significant ROI.
                    </p>
                </div>

                <div className="space-y-16">
                    {CASE_STUDIES.map((study, index) => (
                        <div key={study.id} className="bg-black border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-colors shadow-none hover:shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-800">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit mb-6 ${study.color}`}>
                                        {study.industry} | {study.client}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-8">{study.title}</h2>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center text-red-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                                                <Target className="w-4 h-4 mr-2" /> The Challenge
                                            </h4>
                                            <p className="text-gray-400 text-lg leading-relaxed">{study.problem}</p>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center text-accent font-semibold mb-2 text-sm uppercase tracking-wider">
                                                <Users className="w-4 h-4 mr-2" /> Our Strategy
                                            </h4>
                                            <p className="text-gray-400 text-lg leading-relaxed">{study.strategy}</p>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center text-green-400 font-semibold mb-2 text-sm uppercase tracking-wider">
                                                <TrendingUp className="w-4 h-4 mr-2" /> The Result
                                            </h4>
                                            <p className="text-white font-medium text-lg leading-relaxed">{study.result}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-10 md:p-14 lg:p-16 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-8 font-poppins">Key Metrics Achieved</h3>
                                        <div className="grid grid-cols-2 gap-8">
                                            {study.metrics.map((metric, i) => (
                                                <div key={i} className="bg-black/50 border border-gray-800 rounded-2xl p-6">
                                                    <p className="text-3xl font-black text-accent font-poppins mb-2">{metric.value}</p>
                                                    <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{metric.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-12 w-full h-48 bg-gradient-to-t from-black to-gray-800/10 rounded-2xl border border-gray-800 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                        <div className="absolute inset-0 bg-accent/5 mt-auto group-hover:bg-accent/10 transition-colors"></div>
                                        <span className="text-gray-400 font-semibold group-hover:text-white transition-colors flex items-center">
                                            View Full Campaign Report <ArrowUpRight className="ml-2 w-5 h-5 text-accent" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
