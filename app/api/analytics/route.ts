import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { type, package: pkg, wrapType, carsCount, userName, phoneNumber, businessType } = body;

        if (!type || !['click_quote', 'submission'].includes(type)) {
            return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        }

        // Capture user-agent from request headers
        const userAgent = req.headers.get('user-agent') || 'unknown';

        const newEvent = await Analytics.create({
            type,
            package: pkg,
            wrapType,
            carsCount: carsCount ? Number(carsCount) : undefined,
            userName,
            phoneNumber,
            businessType,
            userAgent,
            timestamp: new Date()
        });

        return NextResponse.json({ success: true, data: newEvent });
    } catch (error: any) {
        console.error('Analytics error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
