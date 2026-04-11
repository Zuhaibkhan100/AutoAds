import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const requestedPeriod = searchParams.get('period') || 'weekly';
        const period = ['daily', 'weekly', 'monthly'].includes(requestedPeriod)
            ? requestedPeriod
            : 'weekly';

        // Calculate time range based on period
        const now = new Date();
        let rangeStart = new Date();
        let dateFormat = "%Y-%m-%d";

        if (period === 'daily') {
            rangeStart.setHours(0, 0, 0, 0); // start of today
            dateFormat = "%H:00"; // hourly buckets
        } else if (period === 'weekly') {
            rangeStart.setDate(now.getDate() - 7);
            dateFormat = "%Y-%m-%d";
        } else if (period === 'monthly') {
            rangeStart.setDate(now.getDate() - 30);
            dateFormat = "%Y-%m-%d";
        }

        // Total clicks + submissions for this period
        const totalClicks = await Analytics.countDocuments({
            type: 'click_quote',
            timestamp: { $gte: rangeStart }
        });
        const totalSubmissions = await Analytics.countDocuments({
            type: 'submission',
            timestamp: { $gte: rangeStart }
        });

        // All-time totals
        const allTimeClicks = await Analytics.countDocuments({ type: 'click_quote' });
        const allTimeSubmissions = await Analytics.countDocuments({ type: 'submission' });

        // Package breakdown for this period
        const packageClicks = await Analytics.aggregate([
            { $match: { type: 'click_quote', timestamp: { $gte: rangeStart } } },
            { $group: { _id: '$package', count: { $sum: 1 } } }
        ]);

        const packageSubmissions = await Analytics.aggregate([
            { $match: { type: 'submission', timestamp: { $gte: rangeStart } } },
            { $group: { _id: '$package', count: { $sum: 1 } } }
        ]);

        // Clicks over time (trend line)
        const clickTrends = await Analytics.aggregate([
            { $match: { type: 'click_quote', timestamp: { $gte: rangeStart } } },
            {
                $group: {
                    _id: { $dateToString: { format: dateFormat, date: "$timestamp" } },
                    clicks: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Submissions over time
        const submissionTrends = await Analytics.aggregate([
            { $match: { type: 'submission', timestamp: { $gte: rangeStart } } },
            {
                $group: {
                    _id: { $dateToString: { format: dateFormat, date: "$timestamp" } },
                    submissions: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Merge click + submission trends into unified data
        const trendMap: Record<string, { date: string; clicks: number; submissions: number }> = {};
        clickTrends.forEach((t: any) => {
            trendMap[t._id] = { date: t._id, clicks: t.clicks, submissions: 0 };
        });
        submissionTrends.forEach((t: any) => {
            if (trendMap[t._id]) {
                trendMap[t._id].submissions = t.submissions;
            } else {
                trendMap[t._id] = { date: t._id, clicks: 0, submissions: t.submissions };
            }
        });
        const trends = Object.values(trendMap).sort((a, b) => a.date.localeCompare(b.date));

        // Recent submissions (last 10) for the live feed
        const recentSubmissions = await Analytics.find({ type: 'submission' })
            .sort({ timestamp: -1 })
            .limit(10)
            .lean();

        // Conversion rate per package
        const allPackages = ['starter', 'growth', 'premium', 'custom'];
        const conversionByPackage = allPackages.map(pkg => {
            const clicks = packageClicks.find((c: any) => c._id === pkg)?.count || 0;
            const subs = packageSubmissions.find((c: any) => c._id === pkg)?.count || 0;
            return {
                name: pkg.charAt(0).toUpperCase() + pkg.slice(1),
                clicks,
                submissions: subs,
                rate: clicks > 0 ? Math.round((subs / clicks) * 100) : 0
            };
        });

        return NextResponse.json({
            success: true,
            period,
            summary: {
                totalClicks,
                totalSubmissions,
                conversionRate: totalClicks > 0 ? ((totalSubmissions / totalClicks) * 100).toFixed(1) : '0',
                allTimeClicks,
                allTimeSubmissions,
            },
            packageDistribution: packageClicks.map((c: any) => ({
                name: (c._id || 'other').charAt(0).toUpperCase() + (c._id || 'other').slice(1),
                value: c.count
            })),
            conversionByPackage,
            trends,
            recentSubmissions: recentSubmissions.map((s: any) => ({
                id: s._id,
                package: s.package,
                userName: s.userName || 'Anonymous',
                phoneNumber: s.phoneNumber || '-',
                businessType: s.businessType || '-',
                wrapType: s.wrapType || '-',
                timestamp: s.timestamp,
            }))
        });
    } catch (error: any) {
        console.error('Stats error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to load admin stats.' },
            { status: 500 }
        );
    }
}
