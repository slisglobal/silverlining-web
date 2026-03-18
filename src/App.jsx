import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import VerifyDefaultPassword from './pages/VerifyDefaultPassword';
import SetPassword from './pages/SetPassword';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';

export default function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#1E293B',
                        color: '#fff',
                        border: '1px solid #334155',
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-default-password" element={<VerifyDefaultPassword />} />
                <Route path="/set-password" element={<SetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="PageNotFound" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
