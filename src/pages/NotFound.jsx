import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, ArrowLeft, HeadphonesIcon } from 'lucide-react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-dark font-display min-h-screen text-slate-100 flex flex-col">
            <header className="w-full flex items-center justify-between border-b border-slate-800 px-6 py-4 lg:px-10">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Rocket className="w-5 h-5" />
                    </div>
                    <h2 className="text-white text-lg font-bold tracking-tight">SaaS Platform</h2>
                </div>
            </header>

            <main className="flex-grow relative flex items-center justify-center px-4 overflow-hidden dot-grid">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark pointer-events-none"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-2xl text-center">
                    <div className="glass-card rounded-xl p-8 md:p-16 shadow-2xl">
                        <div className="mb-6">
                            <span className="text-primary font-bold text-8xl md:text-9xl drop-shadow-[0_0_25px_rgba(99,102,241,0.4)] tracking-tighter select-none">
                                404
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Page Not Found
                        </h1>

                        <p className="text-lg text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/home')}
                                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-primary to-[#4F46E5] text-white font-semibold rounded-[12px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </button>
                            <button
                                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 text-slate-300 font-semibold rounded-[12px] border border-slate-700 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <HeadphonesIcon className="w-5 h-5" />
                                Contact Support
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm">
                        <Link to="#" className="hover:text-primary transition-colors">Help Center</Link>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <Link to="#" className="hover:text-primary transition-colors">System Status</Link>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <Link to="#" className="hover:text-primary transition-colors">Security</Link>
                    </div>
                </div>
            </main>

            <footer className="w-full py-6 text-center text-slate-400 text-xs border-t border-slate-800/50">
                © 2026 SaaS Platform Inc. All rights reserved. Professional Grade Solutions.
            </footer>
        </div>
    );
}
