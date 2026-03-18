import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Shield, HelpCircle, Eye, EyeOff, CheckCircle2, Check, Circle, Mail, Key, ChevronLeft, Lock } from 'lucide-react';
import api from '../utils/api';

export default function SetPassword() {
    const navigate = useNavigate();

    // State
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const pendingEmail = localStorage.getItem('pendingEmail');
        if (pendingEmail) {
            setEmail(pendingEmail);
        }
    }, []);

    // Constraints
    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);

    const rules = [hasMinLength, hasUpperCase, hasNumber, hasSpecialChar];
    const strengthScore = rules.filter(Boolean).length;

    const strengthLabel = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'][strengthScore];
    const strengthColor = ['bg-red-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][strengthScore];
    const textColor = ['text-red-500', 'text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'][strengthScore];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (strengthScore < 4) {
            toast.error('Please meet all password requirements');
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            await api.post('/api/auth/change-password', {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword,
                conformPassword: confirmPassword
            });

            localStorage.removeItem('pendingEmail');

            toast.success('Password updated successfully! Please login again.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update password');
        }
    };

    return (
        <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col font-display">
         

            {/* Navigation Header - Mobile */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center px-4 justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Security Center</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 flex flex-col md:items-center md:justify-center p-6 md:p-8 pt-24 md:pt-8 min-h-screen">
                {/* Centered Reset Card */}
                <div className="max-w-md w-full md:bg-slate-900/50 md:border md:border-slate-800 rounded-2xl md:rounded-xl shadow-2xl overflow-hidden mb-8">
                    {/* Progress Indicator */}
                    <div className="md:px-8 px-0 pt-0 md:pt-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] md:text-xs font-bold md:font-semibold uppercase tracking-widest md:tracking-wider text-primary">Complete Setup</span>
                            <span className="text-[10px] md:text-xs font-medium text-slate-500 md:text-slate-400 uppercase tracking-widest md:tracking-wider">Secure Account</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-full rounded-full"></div>
                        </div>
                    </div>

                    <div className="md:p-8 py-8 px-0">
                        {/* Icon and Title */}
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 md:w-16 md:h-16 rounded-full bg-primary/10 text-primary mb-6 md:mb-4 shadow-xl shadow-primary/5">
                                <Key className="w-10 h-10 md:w-8 md:h-8" />
                            </div>
                            <h1 className="text-3xl md:text-2xl font-bold text-white mb-3">Set up password</h1>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] md:max-w-none mx-auto">Enter the details sent to your email and choose a new secure password.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                            {/* Email Field */}
                            <div className="space-y-4 md:space-y-2">
                                <label className="block text-[10px] md:text-sm font-bold md:font-medium text-slate-500 md:text-slate-300 uppercase md:capitalize tracking-widest md:tracking-normal ml-1" htmlFor="email">Email Address</label>
                                <div className="relative group">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 md:h-12 px-10 md:px-4 bg-slate-900/50 md:bg-slate-800 border-2 md:border border-slate-800 md:border-slate-700 rounded-xl md:rounded-lg focus:ring-0 md:focus:ring-2 focus:border-primary outline-none transition-all text-white placeholder:text-slate-700"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <Mail className="absolute md:right-4 left-3.5 md:left-auto top-1/2 -translate-y-1/2 text-slate-500 md:text-slate-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>

                            {/* Default Password Field */}
                            <div className="space-y-4 md:space-y-2">
                                <label className="block text-[10px] md:text-sm font-bold md:font-medium text-slate-500 md:text-slate-300 uppercase md:capitalize tracking-widest md:tracking-normal ml-1" htmlFor="oldPassword">Default/Old Password</label>
                                <div className="relative group">
                                    <input
                                        id="oldPassword"
                                        type={showOldPassword ? 'text' : 'password'}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full h-14 md:h-12 px-10 md:px-4 bg-slate-900/50 md:bg-slate-800 border-2 md:border border-slate-800 md:border-slate-700 rounded-xl md:rounded-lg focus:ring-0 md:focus:ring-2 focus:border-primary outline-none transition-all text-white placeholder:text-slate-700"
                                        placeholder="Enter the password from email"
                                        required
                                    />
                                    <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        {showOldPassword ? <EyeOff className="w-5 h-5 pointer-events-none" /> : <Eye className="w-5 h-5 pointer-events-none" />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password Field */}
                            <div className="space-y-4 md:space-y-2">
                                <label className="block text-[10px] md:text-sm font-bold md:font-medium text-slate-500 md:text-slate-300 uppercase md:capitalize tracking-widest md:tracking-normal ml-1" htmlFor="new-password">New Password</label>
                                <div className="relative group">
                                    <input
                                        id="new-password"
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full h-14 md:h-12 px-10 md:px-4 bg-slate-900/50 md:bg-slate-800 border-2 md:border border-slate-800 md:border-slate-700 rounded-xl md:rounded-lg focus:ring-0 md:focus:ring-2 focus:border-primary outline-none transition-all text-white placeholder:text-slate-700"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors z-10"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5 pointer-events-none" /> : <Eye className="w-5 h-5 pointer-events-none" />}
                                    </button>
                                </div>

                                {/* Strength Meter Bar */}
                                {newPassword && (
                                    <div className="space-y-1.5 mt-3">
                                        <div className="flex gap-1 h-1.5">
                                            <div className={`flex-1 rounded-full ${strengthScore >= 1 ? strengthColor : 'bg-slate-700'}`}></div>
                                            <div className={`flex-1 rounded-full ${strengthScore >= 2 ? strengthColor : 'bg-slate-700'}`}></div>
                                            <div className={`flex-1 rounded-full ${strengthScore >= 3 ? strengthColor : 'bg-slate-700'}`}></div>
                                            <div className={`flex-1 rounded-full ${strengthScore >= 4 ? strengthColor : 'bg-slate-700'}`}></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className={`text-[11px] font-bold ${textColor} uppercase tracking-wide`}>{strengthLabel}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-4 md:space-y-2">
                                <label className="block text-[10px] md:text-sm font-bold md:font-medium text-slate-500 md:text-slate-300 uppercase md:capitalize tracking-widest md:tracking-normal ml-1" htmlFor="confirm-password">Confirm Password</label>
                                <div className="relative group">
                                    <input
                                        id="confirm-password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full h-14 md:h-12 px-10 md:px-4 bg-slate-900/50 md:bg-slate-800 border-2 md:border border-slate-800 md:border-slate-700 rounded-xl md:rounded-lg focus:ring-0 md:focus:ring-2 focus:border-primary outline-none transition-all text-white placeholder:text-slate-700"
                                        placeholder="Re-type new password"
                                        required
                                    />
                                    <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                        <Shield className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute md:right-10 right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors z-10"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5 pointer-events-none" /> : <Eye className="w-5 h-5 pointer-events-none" />}
                                    </button>
                                    {confirmPassword && newPassword === confirmPassword && (
                                        <div className="absolute right-3 md:right-3 top-1/2 -translate-y-1/2 text-green-500 md:block hidden">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Password Requirements Checklist */}
                            <div className="bg-slate-900/30 md:bg-slate-800/50 rounded-xl md:rounded-lg p-5 md:p-4 border-2 md:border border-slate-800 md:border-slate-700">
                                <p className="text-[10px] md:text-xs font-bold text-slate-500 md:text-slate-400 uppercase tracking-widest mb-4 md:mb-3">Password Requirements</p>
                                <ul className="space-y-3 md:space-y-2 text-sm">
                                    <li className={`flex items-center gap-3 md:gap-2 ${hasMinLength ? 'text-green-400' : 'text-slate-500 md:text-slate-400'}`}>
                                        <div className={`size-5 md:size-4 rounded-full flex items-center justify-center border-2 ${hasMinLength ? 'bg-green-500/10 border-green-500' : 'border-slate-800 md:border-slate-700'}`}>
                                            {hasMinLength && <Check className="w-3 h-3 md:w-2.5 md:h-2.5" />}
                                        </div>
                                        <span className="font-medium md:font-normal">8+ characters</span>
                                    </li>
                                    <li className={`flex items-center gap-3 md:gap-2 ${hasUpperCase ? 'text-green-400' : 'text-slate-500 md:text-slate-400'}`}>
                                        <div className={`size-5 md:size-4 rounded-full flex items-center justify-center border-2 ${hasUpperCase ? 'bg-green-500/10 border-green-500' : 'border-slate-800 md:border-slate-700'}`}>
                                            {hasUpperCase && <Check className="w-3 h-3 md:w-2.5 md:h-2.5" />}
                                        </div>
                                        <span className="font-medium md:font-normal">Uppercase & lowercase letters</span>
                                    </li>
                                    <li className={`flex items-center gap-3 md:gap-2 ${hasNumber ? 'text-green-400' : 'text-slate-500 md:text-slate-400'}`}>
                                        <div className={`size-5 md:size-4 rounded-full flex items-center justify-center border-2 ${hasNumber ? 'bg-green-500/10 border-green-500' : 'border-slate-800 md:border-slate-700'}`}>
                                            {hasNumber && <Check className="w-3 h-3 md:w-2.5 md:h-2.5" />}
                                        </div>
                                        <span className="font-medium md:font-normal">At least one number</span>
                                    </li>
                                    <li className={`flex items-center gap-3 md:gap-2 ${hasSpecialChar ? 'text-green-400' : 'text-slate-500 md:text-slate-400'}`}>
                                        <div className={`size-5 md:size-4 rounded-full flex items-center justify-center border-2 ${hasSpecialChar ? 'bg-green-500/10 border-green-500' : 'border-slate-800 md:border-slate-700'}`}>
                                            {hasSpecialChar && <Check className="w-3 h-3 md:w-2.5 md:h-2.5" />}
                                        </div>
                                        <span className="font-medium md:font-normal">Special character (!@#$%^&*)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-primary to-[#8b5cf6] text-white font-bold rounded-xl md:rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group mt-4"
                            >
                                Change Password & Sign In
                            </button>
                        </form>
                    </div>

                    {/* Footer Link */}
                    <div className="p-8 md:p-6 md:bg-slate-800/30 md:border-t border-slate-800 text-center">
                        <p className="text-sm font-medium md:font-normal text-slate-500 md:text-slate-400">
                            Already have an account? <Link to="/login" className="text-primary font-bold md:font-semibold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
