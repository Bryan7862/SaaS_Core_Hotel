import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { notify } from '../lib/notify';
import { Building2, User, Mail, Lock } from 'lucide-react';

export function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyName: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await notify.promise(
                api.post('/admin/auth/register', formData),
                {
                    loading: 'Creando cuenta...',
                    success: '¡Cuenta creada! Redirigiendo...',
                    error: 'Error al crear la cuenta',
                }
            );
            // On success, redirect to login page
            setTimeout(() => navigate('/login'), 1500); // Small delay to see success message
        } catch (err: any) {
            console.error('Registration failed', err);
            // Error is handled by notify.promise (shows the 'error' text)
            // But if we want specific details? notify.promise shows the 'error' string passed to it.
            // If the promise rejects with a message, does toast show it?
            // react-hot-toast: if 'error' is a string, it shows that string.
            // To show dynamic error, we can pass a function:
            // error: (err) => err.response?.data?.message || 'Error...'
            // But let's keep it simple for now, relying on api.ts global error notification might duplicate?
            // If api.ts notifies error, and notify.promise notifies error...
            // Optimization: If using notify.promise, we might want to suppress global api.ts error?
            // Or just let notify.promise handle the feedback and let api.ts handle global 500s.
            // Actually, if api.ts rejects, notify.promise catches it.
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
            <div className="card max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-sky-500/10 rounded-xl text-sky-500 mb-4">
                        <Building2 size={32} />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Start your journey</h1>
                    <p className="text-[var(--muted)]">Create your company account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[var(--muted)] mb-1">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                                <input
                                    type="text"
                                    required
                                    className="input pl-10"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--muted)] mb-1">Last Name</label>
                            <input
                                type="text"
                                required
                                className="input"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--muted)] mb-1">Company Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                            <input
                                type="text"
                                required
                                className="input pl-10"
                                placeholder="Acme Inc."
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--muted)] mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                            <input
                                type="email"
                                required
                                className="input pl-10"
                                placeholder="you@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--muted)] mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="input pl-10"
                                placeholder="Min. 6 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full justify-center mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}
