import type { Metadata } from 'next';
import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
    weight: ['400', '600', '700', '900'],
    subsets: ['latin'],
    variable: '--font-poppins'
});
const playfair = Playfair_Display({
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-playfair'
});

export const metadata: Metadata = {
    title: 'Turn Every Ride Into a Billboard | Auto Ads',
    description: 'Get your brand on the road with our premium car advertising solutions.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} font-sans bg-primary text-secondary min-h-screen flex flex-col`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
