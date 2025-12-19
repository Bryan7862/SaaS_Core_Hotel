import { User, MapPin, Phone, Globe } from 'lucide-react';

export function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[var(--text)]">Mi Perfil Profesional</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Avatar & Quick Info */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm text-center">
                        <div className="w-32 h-32 mx-auto bg-[var(--bg-primary)] rounded-full flex items-center justify-center border-4 border-[var(--border)] mb-4">
                            <User size={64} className="text-[var(--muted)]" />
                        </div>
                        <h2 className="text-xl font-bold text-[var(--text)]">Admin User</h2>
                        <p className="text-[var(--primary)] font-medium">CEO & Founder</p>
                        <p className="text-[var(--muted)] text-sm mt-1">Gym Center Inc.</p>

                        <div className="mt-6 flex justify-center gap-2">
                            <button className="px-4 py-2 bg-[var(--primary)] text-[var(--bg-soft)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                Cambiar Foto
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border)] shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-[var(--muted)]">
                            <MapPin size={18} />
                            <span className="text-sm">Lima, Perú</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted)]">
                            <Globe size={18} />
                            <span className="text-sm">gymcenter.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted)]">
                            <Phone size={18} />
                            <span className="text-sm">+51 999 999 999</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Edit Details Form */}
                <div className="md:col-span-2">
                    <div className="bg-[var(--card-bg)] p-8 rounded-xl border border-[var(--border)] shadow-sm">
                        <h3 className="text-lg font-bold text-[var(--text)] mb-6 border-b border-[var(--border)] pb-2">Información Personal</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-1">Nombre</label>
                                    <input type="text" defaultValue="Admin" className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-1">Apellido</label>
                                    <input type="text" defaultValue="User" className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-1">Correo Electrónico</label>
                                    <input type="email" defaultValue="admin@gym.com" className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--muted)] mb-1">Teléfono Móvil</label>
                                    <input type="tel" defaultValue="+51 987 654 321" className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--muted)] mb-1">Bio Profesional</label>
                                <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20" defaultValue="Administrador principal con más de 10 años de experiencia en gestión de centros deportivos." />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="button" className="px-6 py-2 bg-[var(--primary)] text-[var(--bg-soft)] rounded-lg font-medium hover:opacity-90 transition-opacity">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
