import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Settings as SettingsIcon, Edit2, CheckCircle2, UploadCloud, UserPlus, Lock, Smartphone, ChevronRight, MoreVertical, Shield } from 'lucide-react';
import api from '../utils/api';

export default function UserProfile() {
    const navigate = useNavigate();
    const [biometricEnabled, setBiometricEnabled] = useState(true);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user.email) return;
            try {
                // Your backend: GET /users/GetProfile?email=...
                const response = await api.get('/users/GetProfile', {
                    params: { email: user.email }
                });
                // BaseController returns success("", result) -> response.data.data
                const freshData = response.data.data || response.data;
                setUser(prev => ({ ...prev, ...freshData }));
                localStorage.setItem('user', JSON.stringify({ ...user, ...freshData }));
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* External Styles for Material Symbols - Only for Mobile View */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* ============================================================
                DESKTOP VIEW (md:block)
               ============================================================ */}
            <div className="hidden md:flex flex-col flex-1 bg-[#0f172a]">
                {/* Top Navigation Bar */}
                <nav className="border-b border-slate-800 bg-[#0f172a] h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Security Center</span>
                    </div>

                    <div className="flex-1 max-w-xl px-12 relative">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search settings..."
                                className="w-full bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-slate-800 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-400 hover:text-white transition-colors relative p-2 rounded-full hover:bg-slate-800">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 size-2 bg-indigo-500 rounded-full border-2 border-[#0f172a]"></span>
                        </button>
                        <button 
                            onClick={() => navigate('/edit-profile')}
                            className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </button>
                        <button className="ml-2 w-8 h-8 rounded-full overflow-hidden border border-slate-700 hover:border-indigo-500 transition-colors">
                            <img src={`https://ui-avatars.com/api/?name=${user.firstName || 'User'}+${user.lastName || ''}&background=f87171&color=fff`} alt="User Avatar" className="w-full h-full object-cover" />
                        </button>
                    </div>
                </nav>

                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 w-full">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative mb-5 group">
                            <div className="w-28 h-28 rounded-full rounded-[40px] bg-slate-800 border-4 border-[#0f172a] shadow-xl overflow-hidden ring-4 ring-slate-800 transition-all group-hover:ring-indigo-500/30">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Alex Johnson" className="w-full h-full object-cover" />
                            </div>
                            <button 
                                onClick={() => navigate('/edit-profile')}
                                className="absolute bottom-0 right-0 p-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition-colors border-4 border-[#0f172a]"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{user.firstName} {user.lastName}</h1>
                        
                        <div className="flex gap-3 items-center text-sm font-medium">
                            <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-bold tracking-wide uppercase text-[10px] border border-indigo-500/20">
                                Pro Account
                            </span>
                            <span className="text-slate-500">&bull;</span>
                            <a href={`mailto:${user.email}`} className="text-slate-400 hover:text-slate-300 transition-colors">
                                {user.email}
                            </a>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex justify-center border-b border-slate-800 mb-10">
                        <nav className="flex gap-8">
                            <button className="pb-4 text-sm font-semibold text-indigo-400 border-b-2 border-indigo-500 relative px-1">
                                Account Overview
                            </button>
                            <button className="pb-4 text-sm font-medium px-1 text-slate-400 hover:text-slate-200 transition-colors">
                                Recent Activity
                            </button>
                            <button className="pb-4 text-sm font-medium px-1 text-slate-400 hover:text-slate-200 transition-colors">
                                Security Settings
                            </button>
                        </nav>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 mb-10">
                        {/* Profile Details Card */}
                        <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/20">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-white tracking-tight">Profile Details</h2>
                                <button 
                                    onClick={() => navigate('/edit-profile')}
                                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                >
                                    Edit Info
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Full Name</p>
                                    <p className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Job Title</p>
                                    <p className="text-sm font-medium text-slate-200">Senior Product Designer</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Organization</p>
                                    <p className="text-sm font-medium text-slate-200">Velocity Digital</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-2">Location</p>
                                    <p className="text-sm font-medium text-slate-200">San Francisco, CA</p>
                                </div>
                                <div className="col-span-1 md:col-span-2 mt-2">
                                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-3">Biography</p>
                                    <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                                        Focused on building scalable design systems for enterprise-level B2B platforms. 
                                        Passionate about user-centric accessibility and modern visual languages.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subscription Card */}
                        <div className="w-full lg:w-[380px] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/20 flex flex-col">
                            <h2 className="text-xl font-bold text-white tracking-tight mb-6">Subscription</h2>
                            
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 mb-8 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all"></div>
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <div>
                                        <h3 className="text-indigo-400 font-bold text-base mb-1">Pro Plan</h3>
                                        <p className="text-xs text-slate-400">Next billing on Oct 12, 2023</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-white">$49/mo</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-semibold text-slate-300">Storage Used</span>
                                        <span className="text-[10px] font-medium text-slate-400">8.4 / 20 GB</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-[42%] rounded-full"></div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-semibold text-slate-300">Projects</span>
                                        <span className="text-[10px] font-medium text-slate-400">12 / 50</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-[24%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-slate-800 mt-20 py-10 text-center">
                    <p className="text-xs text-slate-500">&copy; 2024 Design Operations Platform. All rights reserved.</p>
                </footer>
            </div>

            {/* ============================================================
                MOBILE VIEW (md:hidden)
               ============================================================ */}
            <div className="md:hidden flex flex-col flex-1">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20 px-4 py-3 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors text-slate-900 dark:text-slate-100"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight">Profile</h1>
                    <button 
                        onClick={() => navigate('/edit-profile')}
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 transition-colors text-slate-900 dark:text-slate-100"
                    >
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto pb-24">
                    {/* Hero Profile Section */}
                    <section className="flex flex-col items-center py-8 px-6 bg-gradient-to-b from-primary/10 to-transparent">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/30 p-1">
                                <div 
                                    className="w-full h-full rounded-full bg-cover bg-center shadow-inner" 
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzRmEUY7WBdPxrWjpE3a4yAqyDQO7ZavpkEXPkN5rU-F0tqaGw1WlYVj8IshM5vxSDXkmXzAhAbbrvsBoYEkOVfwh75jju02QY-wcwAqv3NqM-GxH8hfR9WUQouyHv4oljJ4AxCpsPBySoP-QfAr2QXssb7dxlhJrhLvn-cBM85L1UZbYNxVWiaWakb1xWFvqDlOua6dJ4ZxkU0kstgurJDAMKU2yESChxc0EeZVU8HpC19o0QtFx9bW3vKO-3wvN0COCC9jJRz04')" }}
                                >
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate('/edit-profile')}
                                className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-background-dark hover:scale-110 transition-transform"
                            >
                                <span className="material-symbols-outlined !text-sm">edit</span>
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{user.jobTitle || 'No Job Title'}</p>
                        </div>
                    </section>

                    {/* Profile Details Card */}
                    <div className="px-4 space-y-4 max-w-2xl mx-auto w-full">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2">Profile Details</h3>
                        <div className="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden shadow-sm">
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors cursor-pointer border-b border-slate-100 dark:border-primary/5">
                                <span className="material-symbols-outlined text-primary">person</span>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Name</p>
                                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 !text-sm">chevron_right</span>
                            </div>
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors cursor-pointer border-b border-slate-100 dark:border-primary/5">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 !text-sm">chevron_right</span>
                            </div>
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-primary">phone</span>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                                    <p className="font-medium">{user.mobileNo || '+91 000-0000'}</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 !text-sm">chevron_right</span>
                            </div>
                        </div>

                        {/* Subscription Status */}
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 pt-4">Subscription</h3>
                        <div className="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-primary">workspace_premium</span>
                                    </div>
                                    <div>
                                        <p className="font-bold">Premium Plan</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Renews on Nov 15, 2024</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wider">Active</span>
                            </div>
                            <button className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                                Manage Subscription
                            </button>
                        </div>

                        {/* Security Settings */}
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 pt-4">Security Settings</h3>
                        <div className="bg-white dark:bg-primary/5 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden shadow-sm">
                            <div className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors cursor-pointer border-b border-slate-100 dark:border-primary/5">
                                <span className="material-symbols-outlined text-primary">lock</span>
                                <div className="flex-1">
                                    <p className="font-medium">Change Password</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 2 months ago</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 !text-sm">chevron_right</span>
                            </div>
                            <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => setBiometricEnabled(!biometricEnabled)}>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-primary">fingerprint</span>
                                    <div className="flex-1">
                                        <p className="font-medium">Biometric Login</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Use Face ID or Fingerprint</p>
                                    </div>
                                </div>
                                <div className={`w-10 h-6 rounded-full relative transition-colors ${biometricEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${biometricEnabled ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="pt-6 pb-4">
                            <button 
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center gap-2 text-red-500 font-semibold p-4 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors active:scale-[0.98]">
                                <span className="material-symbols-outlined">logout</span>
                                Log Out
                            </button>
                        </div>
                    </div>
                </main>

                {/* Bottom Navigation Bar */}
                <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-primary/20 px-6 py-2 pb-6 flex justify-between items-center z-50">
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-medium uppercase tracking-tighter">Home</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">search</span>
                        <span className="text-[10px] font-medium uppercase tracking-tighter">Search</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="text-[10px] font-medium uppercase tracking-tighter">Activity</span>
                    </a>
                    <a className="flex flex-col items-center gap-1 text-primary" href="#">
                        <span className="material-symbols-outlined !fill-[1]">person</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
                    </a>
                </nav>
            </div>
        </div>
    );
}
