import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Bell, Server, History, BarChart2, CheckCircle, Cloud, Database, Shield, Zap, Power, User, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

// fallback icon map if api doesn't match
const IconMap = {
    dns: Server,
    history: History,
    leaderboard: BarChart2,
    cloud_queue: Cloud,
    analytics: BarChart2,
    api: Zap,
    shield_person: Shield,
    database: Database,
    bolt: Power
};

export default function Home() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : {};

    // Protected Route check done in component or layout, let's do it here
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/service/get-services');
                setServices(response.data.services || []);
            } catch (error) {
                toast.error('Failed to load services');
                // fallback sample data for demonstration if API fails

            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };


    const getStatusBadge = (status) => {
        const lower = status?.toLowerCase();
        if (lower === 'active' || lower === 'running') {
            return <span className="rounded-full bg-green-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-500">{status}</span>;
        }
        if (lower === 'new') {
            return <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400">{status}</span>;
        }
        if (lower === 'coming soon') {
            return <span className="rounded-full bg-slate-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{status}</span>;
        }
        return <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-500">{status}</span>;
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 antialiased min-h-screen flex flex-col overflow-x-hidden">
            {/* Desktop Header */}
            <header className="hidden md:sticky top-0 z-50 w-full border-b border-slate-800 bg-background-dark/80 backdrop-blur-md md:block">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                            <Rocket className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-white">SLIS</h2>
                    </div>

                    <nav className="flex items-center gap-8">
                        <Link to="/home" className="text-sm font-semibold text-primary">Home</Link>
                        <Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">Services</Link>
                        <Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">Reports</Link>
                        <Link to="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">Settings</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary"></span>
                        </button>

                        <div className="relative">
                            <div
                                className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20 bg-slate-800 cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <img alt="User Profile" className="h-full w-full object-cover" src={`https://ui-avatars.com/api/?name=${user.firstName || 'User'}+${user.lastName || ''}&background=6467f2&color=fff`} />
                            </div>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 border border-slate-700 z-50">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                                        <User className="w-4 h-4 mr-2" /> Profile
                                    </button>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                                        <CreditCard className="w-4 h-4 mr-2" /> Billing
                                    </button>
                                    <div className="border-t border-slate-700 my-1"></div>
                                    <button onClick={handleSignOut} className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
                                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header */}
            <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-border-dark px-4 py-3 flex items-center justify-between md:hidden">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                    </div>
                    <div>
                        <h1 className="text-sm font-bold leading-none">SLIS</h1>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Enterprise</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="size-10 flex items-center justify-center rounded-full bg-card-dark border border-border-dark relative">
                        <span className="material-symbols-outlined text-xl">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-background-dark"></span>
                    </button>
                    <div 
                        className="size-10 rounded-full bg-card-dark border border-border-dark overflow-hidden bg-cover bg-center cursor-pointer" 
                        onClick={() => navigate('/profile')}
                        style={{backgroundImage: `url('https://ui-avatars.com/api/?name=${user.firstName || 'User'}+${user.lastName || ''}&background=6467f2&color=fff')`}}
                    ></div>
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl flex-1 px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-0">
                {/* Mobile Welcome Banner */}
                <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[#4a4de6] p-6 text-white shadow-lg shadow-primary/20 md:hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-1">Welcome back, {user.firstName || user.username || 'User'}</h2>
                        <p className="text-white/80 text-sm mb-4">Global Enterprise Solutions • Admin</p>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span className="text-xs font-medium">Last login: 2 hours ago</span>
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 size-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute right-8 top-4 size-16 bg-white/5 rounded-full blur-xl"></div>
                </section>

                {/* Desktop Welcome */}
                <section className="hidden md:block mb-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                            Welcome back, {user.firstName || user.username || 'User'} 👋
                        </h1>
                        <p className="text-slate-400">Your cloud infrastructure is performing 12% better than last week.</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-400">Active Services</p>
                                <Server className="text-primary w-5 h-5" />
                            </div>
                            <p className="text-3xl font-bold text-white">{(services || []).filter(s => s.status?.toLowerCase() === 'active').length}</p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-400">Last Login</p>
                                <History className="text-primary w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-white">2 hours ago</p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-400">Data Usage</p>
                                <BarChart2 className="text-primary w-5 h-5" />
                            </div>
                            <p className="text-3xl font-bold text-white">84%</p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-400">System Health</p>
                                <CheckCircle className="text-green-500 w-5 h-5" />
                            </div>
                            <p className="text-2xl font-bold text-white">Optimal</p>
                        </div>
                    </div>
                </section>

                {/* Quick Stats (Mobile Layout) */}
                <div className="grid grid-cols-2 gap-3 md:hidden">
                    <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
                        <p className="text-xs text-slate-400 mb-1">API Requests</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">1.2M</span>
                            <span className="flex items-center text-[10px] font-bold text-emerald-500">
                                <span className="material-symbols-outlined text-[10px]">trending_up</span>12%
                            </span>
                        </div>
                    </div>
                    <div className="bg-card-dark border border-border-dark p-4 rounded-xl">
                        <p className="text-xs text-slate-400 mb-1">System Health</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">99.9%</span>
                            <span className="material-symbols-outlined text-emerald-500 text-xs text-white">check_circle</span>
                        </div>
                        <p className="text-[10px] text-emerald-500 font-medium mt-1">All systems operational</p>
                    </div>
                </div>

                <section>
                    <div className="mb-4 md:mb-6 flex items-center justify-between">
                        <h2 className="text-lg md:text-xl font-bold text-white">Service Overview</h2>
                        <button className="text-sm font-semibold text-primary hover:underline">Manage All</button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {isLoading ? (
                            <div className="col-span-2 lg:col-span-3 py-10 text-center text-slate-400">
                                <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                                </svg>
                                Loading services...
                            </div>
                        ) : services.map((service, index) => {
                            const IconComponent = IconMap[service.iconName] || Cloud;
                            const isComingSoon = service.status?.toLowerCase() === 'coming soon';

                            return (
                                <div key={service.id || index} className={`group flex flex-col overflow-hidden rounded-xl border border-border-dark bg-card-dark/50 transition-all hover:border-primary/50 hover:shadow-lg ${isComingSoon ? 'opacity-70 pointer-events-none' : ''}`}>
                                    <div className={`h-24 md:h-32 w-full bg-gradient-to-br ${service.gradient || 'from-primary/20 to-blue-500/10'} p-4 md:p-6`}>
                                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-slate-800 shadow-sm">
                                            <IconComponent className="text-primary w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-4 md:p-6">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-bold text-white text-sm md:text-base truncate">{service.name}</h3>
                                            <div className="hidden md:block">
                                                {getStatusBadge(service.status)}
                                            </div>
                                        </div>
                                        <p className="mt-1 md:mt-2 text-[11px] md:text-sm text-slate-400 line-clamp-2">{service.description}</p>
                                        <div className="mt-2 md:hidden">
                                            {getStatusBadge(service.status)}
                                        </div>
                                        <div className="mt-auto pt-4 md:pt-6">
                                            <button className="inline-flex items-center gap-1 text-[11px] md:text-sm font-bold text-primary group-hover:gap-2 transition-all cursor-[inherit]">
                                                Launch <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ); 
                        })}
                    </div>
                </section>

                {/* Recent Activity Section (Mobile Only) */}
                <section className="pb-6 md:hidden">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Events</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-card-dark border border-border-dark rounded-xl">
                            <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-lg">history</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">New deployment successful</p>
                                <p className="text-xs text-slate-400">v2.4.1 deployed to Production</p>
                            </div>
                            <span className="text-[10px] text-slate-500">12m ago</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-card-dark border border-border-dark rounded-xl">
                            <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-lg">vpn_key</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-white">API Key Rotation</p>
                                <p className="text-xs text-slate-400">Security protocol completed</p>
                            </div>
                            <span className="text-[10px] text-slate-500">1h ago</span>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="hidden md:block mt-20 border-t border-slate-800 bg-[#0c0d1b] px-6 py-12">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                                <Rocket className="w-4 h-4" />
                            </div>
                            <h2 className="text-lg font-bold text-white">CloudPulse</h2>
                        </div>
                        <p className="max-w-xs text-sm text-slate-400">
                            The ultimate dashboard for modern cloud management and infrastructure scaling.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Quick Links</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="#" className="text-sm text-slate-400 hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link to="#" className="text-sm text-slate-400 hover:text-primary transition-colors">Pricing Plans</Link></li>
                            <li><Link to="#" className="text-sm text-slate-400 hover:text-primary transition-colors">API Reference</Link></li>
                            <li><Link to="#" className="text-sm text-slate-400 hover:text-primary transition-colors">System Status</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">Contact Info</h3>
                        <ul className="flex flex-col gap-3">
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="text-primary font-semibold">@</span> support@cloudpulse.io
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="text-primary font-semibold">#</span> +1 (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="text-primary font-semibold">•</span> San Francisco, CA
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-8 text-center text-xs text-slate-600">
                    © 2026 CloudPulse Technologies Inc. All rights reserved.
                </div>
            </footer>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur-lg border-t border-border-dark px-2 pb-6 pt-3 z-50 md:hidden">
                <div className="flex items-center justify-around max-w-lg mx-auto">
                    <Link className="flex flex-col items-center gap-1 group" to="/home">
                        <div className="flex h-8 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined fill-1">home</span>
                        </div>
                        <span className="text-[10px] font-bold text-primary">Home</span>
                    </Link>
                    <Link className="flex flex-col items-center gap-1 group text-slate-500" to="#">
                        <div className="flex h-8 w-12 items-center justify-center rounded-full group-hover:bg-card-dark transition-colors">
                            <span className="material-symbols-outlined">grid_view</span>
                        </div>
                        <span className="text-[10px] font-semibold">Services</span>
                    </Link>
                    <Link className="flex flex-col items-center gap-1 group text-slate-500" to="#">
                        <div className="flex h-8 w-12 items-center justify-center rounded-full group-hover:bg-card-dark transition-colors">
                            <span className="material-symbols-outlined">assessment</span>
                        </div>
                        <span className="text-[10px] font-semibold">Reports</span>
                    </Link>
                    <Link className="flex flex-col items-center gap-1 group text-slate-500" to="/profile">
                        <div className="flex h-8 w-12 items-center justify-center rounded-full group-hover:bg-card-dark transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </div>
                        <span className="text-[10px] font-semibold">Settings</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
