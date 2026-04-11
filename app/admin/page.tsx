'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, Users, Image as ImageIcon, ShieldAlert, Upload, Loader2, Trash2, CheckCircle, BarChart3, TrendingUp, Target, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    BarChart, Bar, Legend 
} from 'recharts';

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

export default function AdminPanel() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('campaigns');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Portfolio Form State
    const [clientName, setClientName] = useState('');
    const [campaignType, setCampaignType] = useState('Full Wrap');
    const [category, setCategory] = useState('Retail');
    const [desc, setDesc] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [campaignsNotice, setCampaignsNotice] = useState('');
    const [isCampaignsLoading, setIsCampaignsLoading] = useState(true);
    const [recentUploads, setRecentUploads] = useState<CampaignItem[]>([]);

    // Analytics State
    const [stats, setStats] = useState<any>(null);
    const [isStatsLoading, setIsStatsLoading] = useState(false);
    const [analyticsPeriod, setAnalyticsPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

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

    const fetchCampaigns = async (): Promise<CampaignItem[]> => {
        const res = await fetch('/api/campaigns', { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to load campaigns');
        }

        return data.campaigns || [];
    };

    useEffect(() => {
        let isMounted = true;

        const loadCampaigns = async () => {
            setIsCampaignsLoading(true);

            try {
                const serverCampaigns = await fetchCampaigns();
                const legacyCampaigns = getLegacyCampaigns();
                const unsyncedLegacy = legacyCampaigns.filter(
                    (item) => !serverCampaigns.some((campaign) => campaign.publicId === item.publicId)
                );

                let sharedCampaigns = serverCampaigns;

                if (unsyncedLegacy.length > 0) {
                    if (isMounted) {
                        setCampaignsNotice('Syncing older browser-only campaigns to the shared portfolio...');
                    }

                    const syncResults = await Promise.allSettled(
                        unsyncedLegacy.map((item) =>
                            fetch('/api/campaigns', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    client: item.client,
                                    type: item.type,
                                    category: item.category,
                                    desc: item.desc,
                                    imageUrl: item.imageUrl,
                                    publicId: item.publicId,
                                }),
                            })
                        )
                    );

                    const hasSyncFailure = syncResults.some((result) => {
                        if (result.status === 'rejected') {
                            return true;
                        }

                        return !result.value.ok;
                    });

                    if (hasSyncFailure) {
                        if (isMounted) {
                            setCampaignsNotice('Some older campaigns could not be synced automatically.');
                        }
                    } else {
                        localStorage.removeItem('autoads_portfolio');
                        sharedCampaigns = await fetchCampaigns();

                        if (isMounted) {
                            setCampaignsNotice('');
                        }
                    }
                }

                if (isMounted) {
                    setRecentUploads(sharedCampaigns);
                }
            } catch (error) {
                console.error('Campaign load error:', error);

                const legacyCampaigns = getLegacyCampaigns();
                if (isMounted) {
                    setRecentUploads(legacyCampaigns);
                    setCampaignsNotice(
                        legacyCampaigns.length > 0
                            ? 'Database sync is unavailable. Showing campaigns saved in this browser only.'
                            : 'Unable to load campaigns right now.'
                    );
                }
            } finally {
                if (isMounted) {
                    setIsCampaignsLoading(false);
                }
            }
        };

        loadCampaigns();

        return () => {
            isMounted = false;
        };
    }, []);

    const fetchStats = async (period?: string) => {
        setIsStatsLoading(true);
        try {
            const p = period || analyticsPeriod;
            const res = await fetch(`/api/admin/stats?period=${p}`);
            const data = await res.json();
            if (data.success) {
                setStats(data);
            }
        } catch (e) {
            console.error('Fetch stats error', e);
        } finally {
            setIsStatsLoading(false);
        }
    };

    // Fetch on tab switch
    useEffect(() => {
        if (activeTab === 'analytics') {
            fetchStats();
        }
    }, [activeTab, analyticsPeriod]);

    useEffect(() => {
        if (!previewUrl) return;

        return () => {
            URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setSidebarOpen(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setSelectedFile(file);
            // Create a local preview
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleAddCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus('Please select an image to upload.');
            return;
        }

        setIsUploading(true);
        setUploadStatus('Uploading image to Cloudinary...');

        try {
            // Upload to Cloudinary via our API route
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('folder', 'autoads_portfolio');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            const campaignRes = await fetch('/api/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client: clientName,
                    type: campaignType,
                    category,
                    desc,
                    imageUrl: data.url,
                    publicId: data.public_id,
                }),
            });
            const campaignData = await campaignRes.json();

            if (!campaignRes.ok) {
                await fetch('/api/upload', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ public_id: data.public_id }),
                }).catch(() => {
                    // Ignore cleanup failure and surface the primary error.
                });

                throw new Error(campaignData.error || 'Failed to save campaign');
            }

            const newItem: CampaignItem = campaignData.campaign;
            setRecentUploads((current) => [
                newItem,
                ...current.filter((item) => item.publicId !== newItem.publicId),
            ]);
            localStorage.removeItem('autoads_portfolio');
            setCampaignsNotice('');

            // Reset form
            setClientName('');
            setDesc('');
            setSelectedFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl('');
            setUploadStatus('');
            alert('Campaign uploaded to Cloudinary & added to portfolio!');
        } catch (error: any) {
            console.error('Upload error:', error);
            setUploadStatus(`Error: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteCampaign = async (id: string) => {
        const item = recentUploads.find(i => i.id === id);
        if (!item) return;

        if (!confirm('Delete this campaign? The image will also be removed from Cloudinary.')) return;

        try {
            let cloudinaryDeleteFailed = false;

            // Delete from Cloudinary
            if (item.publicId) {
                const cloudinaryResponse = await fetch('/api/upload', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ public_id: item.publicId }),
                });

                cloudinaryDeleteFailed = !cloudinaryResponse.ok;
            }

            const campaignRes = await fetch(`/api/campaigns?id=${encodeURIComponent(item.id)}`, {
                method: 'DELETE',
            });
            const campaignData = await campaignRes.json();

            if (!campaignRes.ok) {
                throw new Error(campaignData.error || 'Failed to delete campaign');
            }

            setRecentUploads((current) => current.filter((campaign) => campaign.id !== id));

            if (cloudinaryDeleteFailed) {
                alert('Campaign removed from the shared portfolio, but the Cloudinary asset could not be deleted.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to remove the campaign. Please try again.');
        }
    };

    // Redirect non-admin users
    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'admin')) {
            // Don't redirect if still loading
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Show access denied for non-admin users
    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-[80vh] flex items-center justify-center pt-20 pb-24">
                <div className="bg-black border border-red-500/30 rounded-3xl p-10 w-full max-w-md shadow-2xl text-center">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white font-poppins mb-3">Access Denied</h2>
                    <p className="text-gray-400 mb-6">You need admin privileges to access this page.</p>
                    <div className="space-y-3 flex flex-col">
                        <button
                            onClick={() => router.push('/')}
                            className="bg-accent text-primary font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-all w-full"
                        >
                            Go to Homepage
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('autoads_user');
                                window.location.href = '/login';
                            }}
                            className="border border-gray-700 text-gray-400 font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-all w-full"
                        >
                            Logout & Switch Account
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-20">
            <div
                aria-hidden="true"
                className={`fixed inset-0 z-30 bg-black/70 transition-opacity duration-200 lg:hidden ${
                    sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <div className="flex min-h-[calc(100svh-5rem)] overflow-hidden">
            {/* Sidebar */}
                <aside
                    className={`fixed inset-y-20 left-0 z-40 flex w-72 flex-col border-r border-gray-800 bg-gray-900 transition-transform duration-200 lg:static lg:inset-auto lg:w-64 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                <div className="flex items-start justify-between p-6 pb-2">
                    <div className="min-w-0">
                        <h2 className="text-xs tracking-widest text-gray-500 font-bold uppercase mb-2">Dashboard</h2>
                        <p className="text-xs text-accent truncate">{user.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg border border-gray-800 p-2 text-gray-400 transition-colors hover:border-gray-700 hover:text-white lg:hidden"
                        aria-label="Close dashboard menu"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4 pb-6">
                    <button
                        onClick={() => handleTabChange('analytics')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'analytics' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <BarChart3 className="w-5 h-5 mr-3" /> Analytics
                    </button>
                    <button
                        onClick={() => handleTabChange('campaigns')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'campaigns' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <ImageIcon className="w-5 h-5 mr-3" /> Campaigns
                    </button>
                    <button
                        onClick={() => handleTabChange('leads')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'leads' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <Users className="w-5 h-5 mr-3" /> External Leads
                    </button>
                    <button
                        onClick={() => handleTabChange('settings')}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <Settings className="w-5 h-5 mr-3" /> Site Settings
                    </button>
                </nav>
                </aside>

            {/* Main Content */}
                <div className="min-w-0 flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-6 flex items-center justify-between gap-4 lg:mb-8">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500 lg:hidden">Admin</p>
                            <h1 className="text-2xl font-bold text-white capitalize font-poppins">{activeTab.replace('-', ' ')}</h1>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gray-700 hover:bg-gray-800 lg:hidden"
                        >
                            <Menu className="h-4 w-4" /> Menu
                        </button>
                    </div>

                    {activeTab === 'analytics' && (
                        <div className="space-y-8">
                            {/* Period Selector + Refresh */}
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                    {(['daily', 'weekly', 'monthly'] as const).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setAnalyticsPeriod(p)}
                                            className={`px-6 py-3 text-sm font-bold capitalize transition-all ${
                                                analyticsPeriod === p
                                                    ? 'bg-accent text-primary'
                                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => fetchStats()}
                                        disabled={isStatsLoading}
                                        className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400 hover:text-white hover:border-accent/40 transition-all flex items-center gap-2 group"
                                    >
                                        <TrendingUp className={`w-4 h-4 transition-transform ${isStatsLoading ? 'animate-spin' : 'group-hover:translate-y-[-2px]'}`} />
                                        {isStatsLoading ? 'Fetching...' : 'Refresh Data'}
                                    </button>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-gray-400 text-sm">Quote Clicks</p>
                                        <TrendingUp className="w-5 h-5 text-accent" />
                                    </div>
                                    <p className="text-3xl font-black text-white">{stats?.summary?.totalClicks || 0}</p>
                                    <p className="text-xs text-gray-600 mt-2">All-time: {stats?.summary?.allTimeClicks || 0}</p>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-gray-400 text-sm">Form Submissions</p>
                                        <Target className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <p className="text-3xl font-black text-white">{stats?.summary?.totalSubmissions || 0}</p>
                                    <p className="text-xs text-gray-600 mt-2">All-time: {stats?.summary?.allTimeSubmissions || 0}</p>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-gray-400 text-sm">Conversion Rate</p>
                                        <Target className="w-5 h-5 text-green-500" />
                                    </div>
                                    <p className="text-3xl font-black text-white">{stats?.summary?.conversionRate || 0}%</p>
                                    <p className="text-xs text-gray-600 mt-2">Clicks to Submissions</p>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-gray-400 text-sm">Period</p>
                                        <BarChart3 className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <p className="text-3xl font-black text-white capitalize">{analyticsPeriod}</p>
                                    <p className="text-xs text-gray-600 mt-2">{analyticsPeriod === 'daily' ? 'Today' : analyticsPeriod === 'weekly' ? 'Last 7 days' : 'Last 30 days'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Clicks + Submissions Trend */}
                                {/* @ts-ignore - recharts React version mismatch */}
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <h3 className="text-white font-bold mb-6">Clicks & Submissions Over Time</h3>
                                    <div className="h-[300px] w-full">
                                        {/* @ts-ignore */}
                                        <ResponsiveContainer width="100%" height="100%">
                                            {/* @ts-ignore */}
                                            <LineChart data={stats?.trends || []}>
                                                {/* @ts-ignore */}
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                {/* @ts-ignore */}
                                                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                                                {/* @ts-ignore */}
                                                <YAxis stroke="#666" fontSize={12} />
                                                {/* @ts-ignore */}
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                                />
                                                {/* @ts-ignore */}
                                                <Line type="monotone" dataKey="clicks" stroke="#FFD60A" strokeWidth={3} dot={{ fill: '#FFD60A' }} name="Clicks" />
                                                {/* @ts-ignore */}
                                                <Line type="monotone" dataKey="submissions" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} name="Submissions" />
                                                {/* @ts-ignore */}
                                                <Legend />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Conversion by Package */}
                                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                    <h3 className="text-white font-bold mb-6">Conversion by Package</h3>
                                    <div className="h-[300px] w-full">
                                        {/* @ts-ignore */}
                                        <ResponsiveContainer width="100%" height="100%">
                                            {/* @ts-ignore */}
                                            <BarChart data={stats?.conversionByPackage || []}>
                                                {/* @ts-ignore */}
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                                {/* @ts-ignore */}
                                                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                                                {/* @ts-ignore */}
                                                <YAxis stroke="#666" fontSize={12} />
                                                {/* @ts-ignore */}
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                                />
                                                {/* @ts-ignore */}
                                                <Bar dataKey="clicks" fill="#FFD60A" radius={[4, 4, 0, 0]} name="Clicks" />
                                                {/* @ts-ignore */}
                                                <Bar dataKey="submissions" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Submissions" />
                                                {/* @ts-ignore */}
                                                <Legend />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Submissions Feed */}
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                                    <h3 className="text-white font-bold">Recent Quote Submissions</h3>
                                    <span className="text-xs text-green-500 bg-green-500/10 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live
                                    </span>
                                </div>
                                <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left">
                                    <thead className="bg-black text-gray-400 text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">User</th>
                                            <th className="px-6 py-3 font-medium">Phone</th>
                                            <th className="px-6 py-3 font-medium">Business</th>
                                            <th className="px-6 py-3 font-medium">Package</th>
                                            <th className="px-6 py-3 font-medium">Wrap Type</th>
                                            <th className="px-6 py-3 font-medium">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-300 text-sm divide-y divide-gray-800">
                                        {(!stats?.recentSubmissions || stats.recentSubmissions.length === 0) ? (
                                            <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-600">No submissions yet. Data will appear here as users submit quotes.</td></tr>
                                        ) : (
                                            stats.recentSubmissions.map((s: any) => (
                                                <tr key={s.id} className="hover:bg-gray-800/50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-white">{s.userName}</td>
                                                    <td className="px-6 py-4 text-accent">{s.phoneNumber}</td>
                                                    <td className="px-6 py-4">{s.businessType}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                            s.package === 'premium' ? 'bg-purple-500/10 text-purple-400' :
                                                            s.package === 'growth' ? 'bg-blue-500/10 text-blue-400' :
                                                            s.package === 'starter' ? 'bg-green-500/10 text-green-400' :
                                                            'bg-gray-500/10 text-gray-400'
                                                        }`}>
                                                            {s.package || 'Custom'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">{s.wrapType}</td>
                                                    <td className="px-6 py-4 text-gray-500">{new Date(s.timestamp).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'campaigns' && (
                        <div className="space-y-6">
                            {/* Upload Form */}
                            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                        <Upload className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl">Upload New Campaign</h3>
                                        <p className="text-gray-500 text-sm">Images are stored on Cloudinary CDN for fast loading</p>
                                    </div>
                                </div>

                                <form onSubmit={handleAddCampaign} className="space-y-4 max-w-2xl">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Client/Brand Name</label>
                                            <input required value={clientName} onChange={e => setClientName(e.target.value)} type="text" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors" placeholder="e.g. The Local Cafe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Campaign Type</label>
                                            <select value={campaignType} onChange={e => setCampaignType(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors">
                                                <option>Full Wrap</option>
                                                <option>Partial Wrap</option>
                                                <option>Sticker Branding</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Industry Category</label>
                                            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors">
                                                <option>Restaurant</option>
                                                <option>Real Estate</option>
                                                <option>Startup</option>
                                                <option>Retail</option>
                                                <option>Healthcare</option>
                                                <option>Education</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Campaign Photo</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                className="w-full bg-black border border-gray-800 rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Short Description</label>
                                        <input required value={desc} onChange={e => setDesc(e.target.value)} type="text" className="w-full bg-black border border-gray-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-accent transition-colors" placeholder="e.g. Delivered 10k impressions in 2 days." />
                                    </div>

                                    {/* Image Preview */}
                                    {previewUrl && (
                                        <div className="mt-4 border border-gray-800 rounded-lg overflow-hidden h-48 w-full max-w-sm bg-black relative group">
                                            <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-sm font-medium">Ready to upload</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Upload Status */}
                                    {uploadStatus && (
                                        <div className={`text-sm px-4 py-3 rounded-lg ${uploadStatus.startsWith('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-accent/10 text-accent border border-accent/20'}`}>
                                            {uploadStatus}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isUploading}
                                        className="bg-accent text-primary px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,214,10,0.2)]"
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" /> Uploading to Cloudinary...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5" /> Upload & Add to Portfolio
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Recent Uploads */}
                            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                                <h3 className="text-white font-bold mb-4">Uploaded Campaigns ({recentUploads.length})</h3>
                                {campaignsNotice && (
                                    <div className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
                                        recentUploads.length > 0
                                            ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-200'
                                            : 'border-red-500/20 bg-red-500/10 text-red-200'
                                    }`}>
                                        {campaignsNotice}
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {isCampaignsLoading ? (
                                        <div className="py-10 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin"></div>
                                        </div>
                                    ) : null}
                                    {!isCampaignsLoading && recentUploads.length === 0 ? <p className="text-gray-500 text-sm">No campaigns uploaded yet. Use the form above to add your first one.</p> : null}
                                    {recentUploads.map((item) => (
                                        <div key={item.id} className="bg-black border border-gray-800 p-4 rounded-xl flex flex-col gap-4 hover:border-gray-700 transition-colors sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center">
                                                <div className="w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                                                    {item.imageUrl ? (
                                                        <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.client} />
                                                    ) : (
                                                        <ImageIcon className="text-gray-500 w-5 h-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-bold">{item.client}</p>
                                                    <p className="text-gray-500 text-xs">{item.category} | {item.type}</p>
                                                    {item.imageUrl && (
                                                        <p className="text-green-500 text-xs flex items-center gap-1 mt-0.5">
                                                            <CheckCircle className="w-3 h-3" /> Hosted on Cloudinary
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 sm:self-center">
                                                <button
                                                    onClick={() => handleDeleteCampaign(item.id)}
                                                    className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-500/10 rounded-lg flex items-center gap-1 hover:bg-red-500/20 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                            <table className="w-full min-w-[680px] text-left">
                                <thead className="bg-black text-gray-400 text-sm">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Name</th>
                                        <th className="px-6 py-4 font-medium">Industry</th>
                                        <th className="px-6 py-4 font-medium">Budget</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 text-sm divide-y divide-gray-800">
                                    <tr>
                                        <td className="px-6 py-4">Amit Sharma</td>
                                        <td className="px-6 py-4">Restaurant</td>
                                        <td className="px-6 py-4">50k-200k</td>
                                        <td className="px-6 py-4">Today, 10:30 AM</td>
                                        <td className="px-6 py-4"><span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded text-xs">Pending</span></td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4">Priya Singh</td>
                                        <td className="px-6 py-4">Real Estate</td>
                                        <td className="px-6 py-4">200k+</td>
                                        <td className="px-6 py-4">Yesterday</td>
                                        <td className="px-6 py-4"><span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Contacted</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="text-gray-500 text-center py-20">
                            Settings integration pending MVP Phase 2.
                        </div>
                    )}

                </div>
            </div>
        </div>
        </div>
    );
}
