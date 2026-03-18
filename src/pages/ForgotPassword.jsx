import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import api from '../utils/api';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setIsLoading(true);
        try {
            // Regardless of the response, we show success to prevent email enumeration
            await api.post('/forgotPassword', { email });
        } catch (error) {
            // Ignore errors for security reasons
            console.error(error);
        } finally {
            setIsLoading(false);
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <AuthLayout>
                <div className="glass-card rounded-lg p-8 shadow-2xl relative z-10 w-full max-w-[440px] text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                        <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Request Received</h2>
                    <p className="text-slate-400 mb-8">
                        If an account exists with <b>{email}</b>, we have sent password reset instructions.
                    </p>
                    <Link
                        to="/login"
                        className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Login</span>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="glass-card rounded-lg p-8 shadow-2xl relative z-10 w-full max-w-[440px]">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
                    <p className="text-slate-400 text-sm">
                        Enter your email and we'll send you instructions to reset your password.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1" htmlFor="email">Email address</label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-4 text-slate-500 w-5 h-5 pointer-events-none" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary to-[#818cf8] text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                            </svg>
                        ) : (
                            <>
                                <span>Send Reset Link</span>
                                <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to login
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
