import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Campaign from '@/models/Campaign';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CampaignRecord = {
    _id?: { toString(): string } | string;
    client: string;
    type: string;
    category: string;
    desc: string;
    imageUrl: string;
    publicId: string;
    createdAt?: Date | string;
};

function serializeCampaign(campaign: CampaignRecord) {
    return {
        id: campaign._id?.toString() ?? campaign.publicId,
        client: campaign.client,
        type: campaign.type,
        category: campaign.category,
        desc: campaign.desc,
        imageUrl: campaign.imageUrl,
        publicId: campaign.publicId,
        createdAt:
            campaign.createdAt instanceof Date
                ? campaign.createdAt.toISOString()
                : campaign.createdAt ?? new Date().toISOString(),
    };
}

export async function GET() {
    try {
        await dbConnect();
        const campaigns = await Campaign.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json({
            success: true,
            campaigns: campaigns.map(serializeCampaign),
        });
    } catch (error) {
        console.error('Fetch campaigns error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to load campaigns.' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const client = body?.client?.trim();
        const type = body?.type?.trim();
        const category = body?.category?.trim();
        const desc = body?.desc?.trim();
        const imageUrl = body?.imageUrl?.trim();
        const publicId = body?.publicId?.trim();

        if (!client || !type || !category || !desc || !imageUrl || !publicId) {
            return NextResponse.json(
                { success: false, error: 'Missing required campaign fields.' },
                { status: 400 }
            );
        }

        if (!imageUrl.startsWith('https://res.cloudinary.com/')) {
            return NextResponse.json(
                { success: false, error: 'Campaign image must use a valid Cloudinary URL.' },
                { status: 400 }
            );
        }

        await dbConnect();

        const campaign = await Campaign.findOneAndUpdate(
            { publicId },
            {
                client,
                type,
                category,
                desc,
                imageUrl,
                publicId,
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        ).lean();

        if (!campaign) {
            throw new Error('Campaign could not be saved.');
        }

        return NextResponse.json({
            success: true,
            campaign: serializeCampaign(campaign as CampaignRecord),
        });
    } catch (error) {
        console.error('Create campaign error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save campaign.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const publicId = searchParams.get('publicId');

        if (!id && !publicId) {
            return NextResponse.json(
                { success: false, error: 'Campaign identifier is required.' },
                { status: 400 }
            );
        }

        await dbConnect();

        const deletedCampaign = id
            ? await Campaign.findByIdAndDelete(id)
            : await Campaign.findOneAndDelete({ publicId });

        if (!deletedCampaign) {
            return NextResponse.json(
                { success: false, error: 'Campaign not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete campaign error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete campaign.' },
            { status: 500 }
        );
    }
}
