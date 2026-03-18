import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, LayoutGrid } from 'lucide-react';
import api from '../utils/api';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // If already logged in, redirect to home
    if (localStorage.getItem('token')) {
        return <Navigate to="/home" replace />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/login', { emailORUsername: identifier, password });

            // Based on backend: returns success(model.msg, model.data, ...) 
            // result will be response.data.data
            const result = response.data.data;
            console.log('Login Result:', result);
            
            // If data is empty or null, it's a failed login (based on your ResponseModel)
            if (!result || result === "") {
                toast.error(response.data.msg || 'Invalid username or password');
                return;
            }

            const token = result.token || result.accessToken;
            if (!token) {
                toast.error('Session token missing from server');
                return;
            }
            
            // Extract user data from the result
            const userData = result.user || {
                firstName: result.firstName || result.name || result.username || '',
                lastName: result.lastName || '',
                email: result.email || result.email_id || '', // Support Hibernate 'email_id'
                username: result.username || result.emailORUsername || '',
                mobileNo: result.mobileNo || '',
                address: result.address || ''
            };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            toast.success(response.data.msg || 'Successfully logged in');
            navigate('/home');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <AuthLayout>
            <div className="md:glass-card md:rounded-lg md:p-8 md:shadow-2xl relative z-10 w-full md:max-w-[440px]">
                <form className="space-y-6 md:space-y-5" onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 md:text-sm md:font-medium md:text-slate-300 md:capitalize md:tracking-normal ml-1" htmlFor="identifier">
                            Work Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                id="identifier"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full h-14 md:h-auto bg-white dark:bg-slate-800/50 md:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 md:border-slate-700 rounded-xl md:rounded-lg py-3.5 pl-12 md:pl-11 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 md:text-sm md:font-medium md:text-slate-300 md:capitalize md:tracking-normal" htmlFor="password">
                                Password
                            </label>
                            <Link to="/forgot-password" size="sm" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-14 md:h-auto bg-white dark:bg-slate-800/50 md:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 md:border-slate-700 rounded-xl md:rounded-lg py-3.5 pl-12 md:pl-11 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me - Desktop only in original design, but adding mobile check if needed */}
                    <div className="hidden md:flex items-center space-x-2 ml-1">
                        <input
                            id="remember"
                            type="checkbox"
                            className="rounded border-slate-700 bg-slate-900/50 text-primary focus:ring-primary/50 w-4 h-4 cursor-pointer"
                        />
                        <label className="text-xs text-slate-400 cursor-pointer" htmlFor="remember">Keep me logged in</label>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full h-14 bg-gradient-to-r from-primary to-indigo-500 md:to-[#818cf8] text-white font-bold rounded-xl md:rounded-lg shadow-lg shadow-primary/30 md:shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 md:hidden" />
                        <LogIn className="w-5 h-5 hidden md:block" />
                    </button>

                    {/* SSO Divider - Mobile Only */}
                    <div className="flex items-center gap-4 py-4 md:hidden">
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center whitespace-nowrap">Or continue with</span>
                        <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    {/* Social/SSO Login - Mobile Only
                    <div className="grid grid-cols-2 gap-4 md:hidden">
                        <button type="button" className="flex items-center justify-center h-12 border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <img alt="Google logo" className="w-5 h-5 mr-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhPp0FRMSfhURgG4nxU6oRL4nDlcPJ2In0ynklAsi8a6d9Jw__kWO2sOStV3llxO97T8YzOX8ylbRJEfwEgcRhuV4cA3k1nLW-XCpOUkXskByHAfL4bpEFAVQdCSb5P-RvtSpIWe9Vfbw1wo6faAOQA8OtaEqvcLR25bBlwzKnt2XBKxG4s1_CQR1Tr5gLZmdMT5biQHgaKgWxWSs3dvFNGX9nhw7-MecWygOPVXmFOry3cMGt2opdC_HNrHliiyCaOexvtrffvRA" />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Google</span>
                        </button>
                        <button type="button" className="flex items-center justify-center h-12 border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <LayoutGrid className="w-5 h-5 mr-2 text-slate-900 dark:text-white" />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Azure AD</span>
                        </button>
                    </div> */}
                </form>

                {/* Footer Link */}
                <div className="p-8 md:p-0 md:mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    <span className="md:hidden">New to the platform?</span>
                    <span className="hidden md:inline">Don't have an account?</span>
                    <Link to="/register" className="ml-1 text-primary font-bold hover:underline transition-all">
                        <span className="md:hidden">Request Access</span>
                        <span className="hidden md:inline">Create Account</span>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
