import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Admin Seed Check
        const adminEmail = 'autoads.marketing@gmail.com';
        const adminPassword = 'Gmail@autoads123';
        let adminUser = await User.findOne({ email: adminEmail });
        
        if (!adminUser) {
            await User.create({
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
        }
        
        let testConsumer = await User.findOne({ email: 'consumer@example.com' });
        if (!testConsumer) {
            await User.create({
                email: 'consumer@example.com',
                password: 'password123',
                role: 'consumer'
            });
        }

        let user = await User.findOne({ email: cleanEmail });

        if (!user) {
            // Auto-register new emails as consumers during beta testing
            user = await User.create({
                email: cleanEmail,
                password: password,
                role: 'consumer'
            });
        } else if (user.password !== password) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ 
            success: true, 
            user: { 
                email: user.email, 
                role: user.role 
            } 
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
