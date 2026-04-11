'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import brandNameImg from '../../Assets/image_assets/brand_name.png';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);

    // Canvas Watch Animation Logic
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let dpr = 1;
        let animationId: number;

        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
        };

        resize();
        window.addEventListener('resize', resize);

        const isVisible = (angleDeg: number) => {
            const n = ((angleDeg % 360) + 360) % 360;
            return n >= 90 && n <= 270;
        };

        const drawHand = (cx: number, cy: number, angle: number, length: number, width: number, color: string) => {
            const x = cx + Math.cos(angle) * length;
            const y = cy + Math.sin(angle) * length;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.stroke();
        };

        const ACCENT = '#FFD60A'; // Modified to match website theme

        const draw = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const cx = w;
            const cy = h / 2;
            const r = h / 2;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);

            const glow = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.1);
            glow.addColorStop(0, 'rgba(255,214,10,0.03)');
            glow.addColorStop(0.5, 'rgba(255,214,10,0.01)');
            glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, w, h);

            ctx.beginPath();
            ctx.arc(cx, cy, r - 2, Math.PI * 0.5, Math.PI * 1.5);
            ctx.closePath();
            const faceGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            faceGrad.addColorStop(0, 'rgba(255,255,255,0.015)');
            faceGrad.addColorStop(1, 'rgba(255,255,255,0.003)');
            ctx.fillStyle = faceGrad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, r - 1, Math.PI * 0.5, Math.PI * 1.5);
            ctx.strokeStyle = 'rgba(255,255,255,0.14)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, cy, r - 28, Math.PI * 0.5, Math.PI * 1.5);
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 0.5;
            ctx.stroke();

            for (let i = 0; i < 60; i++) {
                if (i % 5 === 0) continue;
                const aDeg = i * 6 - 90;
                if (!isVisible(aDeg)) continue;

                const a = aDeg * Math.PI / 180;
                const o = r - 12;
                const inner = r - 18;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * o, cy + Math.sin(a) * o);
                ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            for (let i = 0; i < 12; i++) {
                const aDeg = i * 30 - 90;
                if (!isVisible(aDeg)) continue;

                const a = aDeg * Math.PI / 180;
                const main = i % 3 === 0;
                const o = r - 10;
                const inner = main ? r - 48 : r - 32;

                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * o, cy + Math.sin(a) * o);
                ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
                ctx.strokeStyle = main ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)';
                ctx.lineWidth = main ? 2.5 : 1;
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            const now = new Date();
            const hrs = now.getHours() % 12;
            const min = now.getMinutes();
            const sec = now.getSeconds();
            const ms = now.getMilliseconds();

            const sSmooth = sec + ms / 1000;
            const mSmooth = min + sSmooth / 60;
            const hSmooth = hrs + mSmooth / 60;

            const secArcStart = Math.PI * 0.5;
            const secArcEnd = secArcStart + (sSmooth / 60) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r - 5, secArcStart, secArcEnd);
            ctx.strokeStyle = 'rgba(255,214,10,0.15)';
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.stroke();

            const hAngle = (hSmooth * 30 - 90) * Math.PI / 180;
            drawHand(cx, cy, hAngle, r * 0.42, 3.2, 'rgba(255,255,255,0.82)');

            const mAngle = (mSmooth * 6 - 90) * Math.PI / 180;
            drawHand(cx, cy, mAngle, r * 0.62, 1.8, 'rgba(255,255,255,0.58)');

            const sAngle = (sSmooth * 6 - 90) * Math.PI / 180;
            drawHand(cx, cy, sAngle + Math.PI, r * 0.13, 0.9, ACCENT);
            drawHand(cx, cy, sAngle, r * 0.7, 0.9, ACCENT);

            ctx.beginPath();
            ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = ACCENT;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();

            const pad = (n: number) => String(n).padStart(2, '0');
            if (timeRef.current) {
                timeRef.current.textContent = `${pad(now.getHours())}:${pad(min)}:${pad(sec)}`;
            }
            if (dateRef.current) {
                dateRef.current.textContent = now.toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric'
                });
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        const success = await login(email, password);
        if (success) {
            if (email.trim().toLowerCase() === 'autoads.marketing@gmail.com') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            setError('Invalid credentials.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-[#060606] text-white font-['DM_Sans',_sans-serif] overflow-hidden relative flex items-center">
            {/* Watch Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />

            <div className="fixed left-14 top-14 z-10 pointer-events-none">
                <span className="text-[11px] font-light text-white/20 uppercase tracking-[6px]">Auto Ads</span>
            </div>

            <div className="fixed left-14 bottom-14 z-10 pointer-events-none">
                <div ref={timeRef} className="font-['Space_Mono',_monospace] text-[clamp(32px,5vw,56px)] font-bold tracking-[-2px] text-white/90 leading-none">00:00:00</div>
                <div ref={dateRef} className="text-[clamp(11px,1.4vw,14px)] font-light text-white/30 mt-2.5 tracking-[3px] uppercase"></div>
                <div className="text-[10px] font-medium text-white/10 mt-5 tracking-[5px] uppercase">Local Time</div>
            </div>

            {/* Login UI Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-14 flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-md pointer-events-auto">
                    {/* Transparent Login Card */}
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                        {/* Interactive border glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="relative">
                            <div className="flex flex-col items-center mb-10">
                                <img src={brandNameImg.src} alt="Auto Ads Logo" className="h-14 w-auto mb-6 opacity-90" />
                                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Login</h2>
                                <p className="text-white/40 text-sm">Access your marketing dashboard</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email address"
                                            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-white/20 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl text-center animate-shake">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-accent text-primary font-black py-4 rounded-2xl hover:bg-yellow-400 transition-all shadow-[0_15px_30px_rgba(255,214,10,0.2)] hover:shadow-[0_20px_40px_rgba(255,214,10,0.4)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden relative"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                                    ) : (
                                        <span className="relative z-10 flex items-center justify-center">
                                            Sign In <LogIn className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between text-[11px] text-white/20 font-medium px-4">
                        <span>&copy; {new Date().getFullYear()} Auto Ads</span>
                        <span className="flex items-center gap-4">
                            <span className="hover:text-white/40 cursor-pointer transition-colors">Privacy</span>
                            <span className="hover:text-white/40 cursor-pointer transition-colors">Terms</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Global Fonts Import (Standard way in Next.js would be layout, but adding here via style tag as fallback or using local font classes) */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,400;9..40,700&family=Space+Mono:wght@400;700&display=swap');
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>
        </div>
    );
}
