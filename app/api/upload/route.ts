import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function hasCloudinaryConfig() {
    return Boolean(
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
}

export async function POST(request: NextRequest) {
    try {
        if (!hasCloudinaryConfig()) {
            return NextResponse.json(
                { error: 'Cloudinary is not configured on the server.' },
                { status: 500 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = (formData.get('folder') as string) || 'autoads_portfolio';

        if (!file || typeof file.arrayBuffer !== 'function') {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (!file.type?.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image uploads are allowed.' }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'Image is too large. Please upload a file under 10 MB.' },
                { status: 400 }
            );
        }

        // Convert file to base64 data URI for Cloudinary upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: folder,
            resource_type: 'image',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });

        if (!result.secure_url || !result.public_id) {
            throw new Error('Cloudinary did not return a usable upload response.');
        }

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
        });
    } catch (error: any) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Upload failed' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        if (!hasCloudinaryConfig()) {
            return NextResponse.json(
                { error: 'Cloudinary is not configured on the server.' },
                { status: 500 }
            );
        }

        const { public_id } = await request.json();

        if (!public_id) {
            return NextResponse.json({ error: 'No public_id provided' }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        return NextResponse.json({
            success: true,
            result: result,
        });
    } catch (error: any) {
        console.error('Cloudinary delete error:', error);
        return NextResponse.json(
            { error: error.message || 'Delete failed' },
            { status: 500 }
        );
    }
}
