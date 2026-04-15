import Link from 'next/link';
import { Mail, Phone, Users } from 'lucide-react';
import brandNameImg from '../Assets/image_assets/brand_name.png';

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="flex items-center">
                            <img src={brandNameImg.src} alt="Auto Ads Logo" className="h-10 w-auto" />
                        </Link>
                        <p className="mt-4 text-gray-400 text-sm">
                            Turn Every Ride Into a Billboard. We connect brands with high-mileage drivers for targeted, high-impact out-of-home advertising.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/services" className="text-gray-400 hover:text-accent text-sm transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-accent text-sm transition-colors">Portfolio</Link></li>
                            <li><Link href="/case-studies" className="text-gray-400 hover:text-accent text-sm transition-colors">Case Studies</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-accent text-sm transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <a href="mailto:autoads.marketing@gmail.com" className="hover:text-accent transition-colors">autoads.marketing@gmail.com</a>
                                    <a href="mailto:autoads.advertising@icloud.com" className="hover:text-accent transition-colors">autoads.advertising@icloud.com</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                                <a href="tel:+919454420712" className="hover:text-accent transition-colors">+91 94544 20712</a>
                            </li>
                            <li className="mt-1 text-gray-500">Lucknow, UP, India</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Our Team</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <p className="text-white font-medium">Akash Singh Dangi</p>
                                <p className="text-gray-500 text-xs">Co-Founder</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Suyash Trivedi</p>
                                <p className="text-gray-500 text-xs">Co-Founder</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Harshit Pawar</p>
                                <p className="text-gray-500 text-xs">Media Manager</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Zuhaib Khan</p>
                                <p className="text-gray-500 text-xs">Design Engineer</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Auto Ads. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
