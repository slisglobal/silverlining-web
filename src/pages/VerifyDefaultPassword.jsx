import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Key, Eye, EyeOff, AlertCircle, ArrowLeft, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

export default function VerifyDefaultPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const pendingEmail = localStorage.getItem('pendingEmail');

    useEffect(() => {
        if (!pendingEmail) {
            navigate('/login');
        }
    }, [pendingEmail, navigate]);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => setCooldown(c => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) return;
        setIsLoading(true);

        try {
            const response = await api.post('/login', { identifier: pendingEmail, password });

            localStorage.setItem('token', response.data.token || response.data.accessToken || 'test_token');
            localStorage.setItem('user', JSON.stringify(response.data.user || {}));
            localStorage.setItem('defaultPwdUsed', password);

            toast.success('Password verified. Please set a new one.');
            navigate('/set-password');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0) return;
        try {
            await api.post('/forgotPassword', { email: pendingEmail });
            toast.success('Email resent successfully');
            setCooldown(60);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend email');
        }
    };

    if (!pendingEmail) return null;

    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen flex flex-col md:items-center md:justify-center overflow-x-hidden">
            {/* Mobile Top Navigation */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center px-4 justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Verification</h1>
                <div className="w-10"></div>
            </div>

            <div className="w-full max-w-md px-6 md:px-0 md:pt-0 pt-24 pb-12">
                {/* Main Verification Card */}
                <div className="bg-slate-900/50 md:border md:border-slate-800 rounded-2xl md:rounded-xl shadow-2xl p-8 md:p-10 md:backdrop-blur-sm">
                    {/* Icon Section */}
                    <div className="flex justify-center mb-10">
                        <div className="relative flex items-center justify-center size-24 md:size-20 bg-primary/10 rounded-full">
                            <Mail className="text-primary w-12 h-12 md:w-10 md:h-10" />
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-2 md:p-1.5 border-4 border-slate-900 shadow-xl">
                                <Key className="w-5 h-5 md:w-4 md:h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Header Text */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-2xl font-bold text-white mb-4 font-display">Check your email</h1>
                        <p className="text-slate-400 text-base md:text-sm leading-relaxed max-w-[280px] md:max-w-none mx-auto">
                            We've sent a temporary password to <span className="md:inline hidden"><b>{pendingEmail}</b></span><span className="md:hidden">your inbox. Please enter it below to verify your account.</span>
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4 md:space-y-2">
                            <label className="block text-[10px] md:text-sm font-bold md:font-medium text-slate-500 md:text-slate-300 uppercase md:capitalize tracking-widest md:tracking-normal ml-1" htmlFor="password">
                                <span className="md:inline hidden">Default Password</span>
                                <span className="md:hidden">Verification Code</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full h-14 md:h-12 px-6 md:px-4 bg-slate-900/50 md:bg-slate-800/50 border-2 md:border border-slate-800 md:border-slate-700 rounded-xl md:rounded-lg text-slate-100 focus:ring-0 md:focus:ring-2 focus:border-primary transition-all placeholder:text-slate-700 text-center tracking-[0.5em] md:tracking-normal text-xl md:text-base font-bold"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5 pointer-events-none" /> : <Eye className="w-5 h-5 pointer-events-none" />}
                                </button>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 md:h-12 bg-primary hover:bg-primary/90 text-white font-bold md:font-semibold rounded-xl md:rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                                </svg>
                            ) : (
                                'Verify & Continue'
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-4">
                        <button
                            onClick={handleResend}
                            disabled={cooldown > 0}
                            className="text-sm font-medium text-slate-400 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto"
                        >
                            <span className="md:inline hidden">Didn't get it? </span>
                            <span className="md:hidden text-slate-400">Didn't receive the email? </span>
                            <span className="text-primary hover:underline font-bold md:font-normal">Resend {cooldown > 0 ? `email (${cooldown}s)` : (
                                <span className="md:hidden">code</span>
                            )}
                            <span className="hidden md:inline">{cooldown > 0 ? '' : 'email'}</span>
                            </span>
                        </button>
                        <div className="pt-6 border-t border-slate-800">
                            <Link to="/login" className="flex flex-row items-center justify-center gap-2 mx-auto text-xs text-slate-500 hover:text-slate-300 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to login
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="mt-8 flex justify-center gap-6 opacity-50">
                    <div className="h-1 w-8 bg-primary rounded-full"></div>
                    <div className="h-1 w-8 bg-slate-700 rounded-full"></div>
                    <div className="h-1 w-8 bg-slate-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
