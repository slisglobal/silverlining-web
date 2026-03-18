import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditProfile() {
    const navigate = useNavigate();
    
    // Retrieve user data from localStorage
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : {};

    const [fullName, setFullName] = useState(`${user.firstName || ''} ${user.lastName || ''}`.trim() || ' ');
    const [email, setEmail] = useState(user.email || '');
    const [jobTitle, setJobTitle] = useState(user.jobTitle || '');
    const [bio, setBio] = useState(user.bio || '');

    const handleSave = async () => {
        try {
            // Your backend expects: PUT /users/edit/{email}?name={name}
            const response = await api.put(`/users/edit/${user.email}`, null, {
                params: { name: fullName }
            });

            // The backend returns a User object. Let's merge it into local storage.
            // Note: If response.data is the user object, we use it directly.
            const updatedUser = {
                ...user,
                ...(response.data.data || response.data), // handle both raw user or wrapped response
                firstName: fullName.split(' ')[0] || '',
                lastName: fullName.split(' ').slice(1).join(' ') || '',
                jobTitle: jobTitle,
                bio: bio
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.success('Profile updated successfully');
            navigate('/profile');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile to server');
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex antialiased">
            {/* External Styles for Material Symbols */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Sidebar Navigation - Desktop Only */}
            <aside className="hidden lg:flex w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">SLIS</span>
                    </div>
                    <nav className="space-y-1">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary group cursor-pointer transition-all">
                            <span className="material-symbols-outlined text-[22px]">person</span>
                            <span className="font-medium text-sm">General</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-[22px] group-hover:text-primary">shield</span>
                            <span className="font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-slate-100">Security</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-[22px] group-hover:text-primary">notifications</span>
                            <span className="font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-slate-100">Notifications</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                            <span className="material-symbols-outlined text-[22px] group-hover:text-primary">credit_card</span>
                            <span className="font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-slate-100">Billing</span>
                        </div>
                    </nav>
                </div>
                <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 p-2 rounded-xl transition-all">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                            <img
                                alt="User avatar"
                                src={`https://ui-avatars.com/api/?name=${user.firstName || 'User'}+${user.lastName || ''}&background=6467f2&color=fff`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate leading-none mb-1">{user.firstName} {user.lastName}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-4 h-16">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">General Settings</h1>
                <div className="w-10"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 lg:p-12 pt-24 lg:pt-12 max-w-5xl mx-auto w-full">
                <header className="mb-10 lg:block hidden">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">General Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your profile information and how users see you on the platform.</p>
                </header>

                {/* Settings Card */}
                <div className="bg-white dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 md:p-10 space-y-10">
                        {/* Profile Photo Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-8 pb-10 border-b border-slate-100 dark:border-slate-800/50">
                            <div className="relative group cursor-pointer w-fit">
                                <div className="h-28 w-28 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-inner">
                                    <img
                                        alt="Profile display"
                                        src={`https://ui-avatars.com/api/?name=${user.firstName || 'User'}+${user.lastName || ''}&background=6467f2&color=fff`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-primary/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-xl">Profile Photo</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">Update your profile picture for better recognition. JPG, GIF or PNG. Max size 2MB.</p>
                                <div className="flex gap-4">
                                    <button className="px-5 py-2.5 text-xs font-bold bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                                        Upload New
                                    </button>
                                    <button className="px-5 py-2.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                    placeholder="Enter your full name"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                    placeholder="name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Job Title</label>
                                <input
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                                    placeholder="e.g. Software Engineer"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Bio</label>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{bio.length} / 250</span>
                                </div>
                                <textarea
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium leading-relaxed"
                                    placeholder="Tell us a bit about yourself..."
                                    rows="4"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-8 py-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="px-8 py-3 text-sm font-bold bg-primary text-white rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 uppercase tracking-widest"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-12 p-8 border-2 border-red-500/20 bg-red-500/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm shadow-red-500/5">
                    <div className="text-center md:text-left">
                        <h3 className="font-black text-red-500 uppercase tracking-widest text-sm mb-2">Danger Zone</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">Once you delete your account, there is no going back. All your data will be permanently removed.</p>
                    </div>
                    <button className="px-6 py-3 text-xs font-bold bg-white dark:bg-transparent border-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-red-500/10 active:scale-95">
                        Deactivate Account
                    </button>
                </div>
            </main>
        </div>
    );
}
