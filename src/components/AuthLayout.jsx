import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthLayout({ children }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col md:items-center md:justify-center bg-background-dark font-body text-slate-100">
            {/* Background Elements */}
            <div className="absolute inset-0 dot-grid pointer-events-none opacity-50 md:opacity-100"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Background Decorative Elements for Mobile */}
            <div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] md:hidden"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-80 h-80 bg-indigo-900/10 rounded-full blur-[120px] md:hidden"></div>

            <main className="relative z-10 w-full md:max-w-[440px] px-6 flex flex-col min-h-screen md:min-h-auto">
                {/* Mobile Top Navigation */}
                <div className="flex items-center py-4 md:hidden">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-400 flex size-10 items-center justify-center rounded-full hover:bg-white/5 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Logo & Header - Responsive */}
                <div className="flex flex-col items-center mb-10 md:mb-8 text-center pt-4 md:pt-0">
                    <div className="w-16 h-16 md:w-12 md:h-12 bg-gradient-to-tr from-primary to-indigo-400 md:bg-primary rounded-xl md:rounded-lg flex items-center justify-center mb-6 md:mb-4 shadow-lg shadow-primary/20">
                        <svg className="text-white size-10 md:size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-2xl font-display font-bold text-white mb-2 tracking-tight">SLIS</h1>
                    <p className="text-slate-400 text-sm font-medium">Empower your workflow with intelligent tools</p>
                </div>

                <div className="flex-1 md:flex-initial">
                    {children}
                </div>

            </main>
        </div>
    );
}
