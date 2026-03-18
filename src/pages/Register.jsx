import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle2, ShieldCheck, Lock, User, Mail, Phone, MapPin, Calendar, ChevronLeft } from 'lucide-react';
import api from '../utils/api';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        dob: '',
        email: '',
        mobileNo: '',
        address: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // clear error for field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = 'First name is required';
        if (!formData.lastName) tempErrors.lastName = 'Last name is required';
        if (!formData.username) tempErrors.username = 'Username is required';
        if (!formData.dob) tempErrors.dob = 'Date of birth is required';
        if (!formData.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.mobileNo) {
            tempErrors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            tempErrors.mobileNo = 'Mobile number must be 10 digits';
        }
        if (!formData.address) tempErrors.address = 'Address is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await api.post('/api/auth/register', formData);
            localStorage.setItem('pendingEmail', formData.email);
            navigate('/set-password');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="bg-background-dark font-display text-slate-100 antialiased h-screen flex w-full overflow-hidden">
            {/* Mobile Top Navigation */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center px-4 justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold text-white">Create Account</h1>
                <div className="w-10"></div> {/* Spacer for symmetry */}
            </div>

            {/* Left Side: Branded Illustration Panel */}
            <div className="hidden md:flex md:w-1/2 relative bg-primary/10 overflow-hidden items-center justify-center p-12">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary blur-[150px]"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                    <div className="mb-12">
                        <div className="size-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 mx-auto">
                            <svg className="text-white size-10" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Empower your workflow.</h1>
                    <p className="text-lg text-slate-400 mb-8">Join thousands of teams scaling their business with our intelligent SaaS tools and real-time analytics.</p>
                    <div className="w-full aspect-video rounded-xl bg-slate-800/50 border border-slate-700 overflow-hidden shadow-2xl relative">
                        <img className="w-full h-full object-cover" alt="Abstract vibrant purple and blue digital gradient interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpgSRIRKDlV-4MfwuJUNNUDwUGou7i9jBWG_Fl61ou0zDPcfszkGbPA3LYey6rkhNOQy4D11Zi8tP7hbUccJL1da-XLHP8YNttdNhh4Ck_mvXw07m3FH-VNy2sJaf-nX_Xo7p3JcQ2gCoZWmAay_BqISMnJgzM5n-_aLnoTvG0BWbxee5WWJORK8waghY-jZr-Rffg6UWt903Af6Wbn4pHxlhcHkr4cu_hQI8LctYdZzidBna8WKdnXKkLm1-LikEK-2vtBYzAHA8" />
                    </div>
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto">
                <div className="max-w-[480px] w-full mx-auto px-6 py-10 flex flex-col h-full">
                    {/* Progress Indicator */}
                    <div className="mb-12">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-semibold text-primary">Step 1 of 3</span>
                            <span className="text-sm text-slate-400">Account Details</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-1/3 rounded-full transition-all duration-500"></div>
                        </div>
                    </div>

                    <div className="mb-8 md:mt-0 mt-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:block hidden">Create your account</h2>
                        <h2 className="text-3xl font-bold text-white mb-2 md:hidden">Let's get started</h2>
                        <p className="text-sm text-slate-400 md:block hidden">Please provide your details to get started with the trial.</p>
                        <p className="text-slate-400 md:hidden text-base leading-relaxed">Enter your personal information to setup your B2B dashboard and start managing your team.</p>
                    </div>

                    <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">First Name</label>
                                <div className="relative group">
                                    <input
                                        className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                        id="firstName" name="firstName" placeholder="e.g. John" type="text"
                                        value={formData.firstName} onChange={handleChange}
                                    />
                                    <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="firstName">First Name</label>
                                    {!errors.firstName && formData.firstName && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Last Name</label>
                                <div className="relative group">
                                    <input
                                        className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                        id="lastName" name="lastName" placeholder="e.g. Doe" type="text"
                                        value={formData.lastName} onChange={handleChange}
                                    />
                                    <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="lastName">Last Name</label>
                                    {!errors.lastName && formData.lastName && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Username */}
                        <div>
            
                            <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
                            <div className="relative group">
                                <input
                                    className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all ${errors.username ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                    id="username" name="username" placeholder="e.g. johndoe" type="text"
                                    value={formData.username} onChange={handleChange}
                                />
                                <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                    <User className="w-4 h-4" />
                                </div>
                                <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="username">Username</label>
                                {!errors.username && formData.username && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Date of Birth</label>
                            <div className="relative group">
                                <input
                                    className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 transition-all [color-scheme:dark] ${errors.dob ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                    id="dob" name="dob" placeholder=" " type="date"
                                    value={formData.dob} onChange={handleChange}
                                />
                                <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="dob">Date of Birth</label>
                            </div>
                            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                        </div>

                        {/* Email ID */}
                        <div>
                            <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Work Email</label>
                            <div className="relative group">
                                <input
                                    className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                    id="email" name="email" placeholder="name@company.com" type="email"
                                    value={formData.email} onChange={handleChange}
                                />
                                <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="email">Email ID </label>
                                {!errors.email && formData.email && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mobile Number</label>
                            <div className="relative group">
                                <input
                                    className={`peer block w-full md:px-4 px-10 md:pt-6 pt-0 pb-2 md:pb-2 h-12 md:h-auto text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all ${errors.mobileNo ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                    id="mobileNo" name="mobileNo" placeholder="e.g. 1234567890" type="tel"
                                    value={formData.mobileNo} onChange={handleChange}
                                />
                                <div className="md:hidden absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none z-10">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="mobileNo">Mobile Number</label>
                                {!errors.mobileNo && formData.mobileNo && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="md:hidden block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Address</label>
                            <div className="relative group">
                                <textarea
                                    className={`peer block w-full md:px-4 px-10 md:pt-6 pt-4 pb-2 text-white bg-slate-900/50 md:bg-transparent rounded-xl md:rounded-lg focus:ring-0 focus:border-primary border-2 appearance-none transition-all resize-none ${errors.address ? 'border-red-500 focus:border-red-500' : 'border-slate-800 md:border-slate-700'}`}
                                    id="address" name="address" placeholder="e.g. 123 Street Name" rows="2"
                                    value={formData.address} onChange={handleChange}
                                ></textarea>
                                <div className="md:hidden absolute left-3.5 top-6 text-slate-500 pointer-events-none z-10">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <label className="md:block hidden absolute text-sm text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3" htmlFor="address">Address</label>
                            </div>
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <button
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                            type="submit"
                        >
                            <span className="hidden md:inline">Continue</span>
                            <span className="md:hidden">Continue to Step 2</span>
                        </button>
                    </form>

                    <div className="mt-auto pt-10 text-center">
                        <p className="text-slate-400">
                            <span className="md:inline hidden">Already registered?</span>
                            <span className="md:hidden">Already have an account?</span>
                            <Link to="/login" className="ml-1 text-primary font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>

                    {/* <div className="mt-8 flex justify-center gap-6">
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Secure Registration
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            GDPR Compliant
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
