import React, { useState, useEffect } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { getUsers } from '../api';
import { RoleBadge } from '../components/RoleBadge';
import { CreateRoleModal } from '../components/CreateRoleModal';
import { EditUserRoleModal } from '../components/EditUserRoleModal';
import { api } from '../../../lib/api'; // Using default axios instance for Create User for now

export const UsersPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '', defaultCompanyId: '' });
    const [error, setError] = useState<string | null>(null);

    // Modals
    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error loading users', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload: any = {
                email: formData.email,
                password: formData.password,
            };
            if (formData.defaultCompanyId) {
                payload.defaultCompanyId = formData.defaultCompanyId;
            }
            await api.post('/admin/auth/users', payload); // Ensure correct endpoint path
            setFormData({ email: '', password: '', defaultCompanyId: '' });
            loadUsers();
            alert('User created successfully');
        } catch (err: any) {
            console.error('Failed to create user', err);
            const msg = Array.isArray(err.response?.data?.message)
                ? err.response.data.message.join(', ')
                : err.response?.data?.message || 'Failed to create user';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (user: any) => {
        setSelectedUser(user);
        setIsEditRoleOpen(true);
    };

    const handleRoleUpdated = () => {
        loadUsers();
    };

    if (loading && users.length === 0) return <div>Loading...</div>;

    return (
        <div className="space-y-8 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create User Form - Preserved from Old Design */}
                <div className="card bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500">
                            <UserPlus size={20} />
                        </div>
                        <h2 className="text-xl font-bold">Create User</h2>
                    </div>
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Min. 6 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default Company ID (UUID)</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                placeholder="Optional"
                                value={formData.defaultCompanyId}
                                onChange={(e) => setFormData({ ...formData, defaultCompanyId: e.target.value })}
                            />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition-colors">
                            Create User
                        </button>
                    </form>
                </div>

                {/* Role Management Actions */}
                <div className="card bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Role Management</h2>
                        <p className="text-gray-500">Define new roles for the organization.</p>
                    </div>
                    <button
                        onClick={() => setIsCreateRoleOpen(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                        <span>+ Create New Role Definition</span>
                    </button>
                </div>
            </div>

            {/* Users List with Modern Role Badges */}
            <div className="card bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <Users size={20} />
                    </div>
                    <h2 className="text-xl font-bold">Users Directory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm">
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Roles (New)</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-900">
                                        {user.firstName ? `${user.firstName} ${user.lastName}` : 'N/A'}
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-600">{user.email}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.status || 'ACTIVE'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex gap-2 flex-wrap">
                                            {user.userRoles?.map((ur: any) => (
                                                <RoleBadge key={ur.id} roleCode={ur.role.code} />
                                            ))}
                                            {(!user.userRoles || user.userRoles.length === 0) && <span className="text-gray-400 text-xs italic">No roles</span>}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleEditClick(user)}
                                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                                        >
                                            Edit Roles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <CreateRoleModal
                isOpen={isCreateRoleOpen}
                onClose={() => setIsCreateRoleOpen(false)}
                onRoleCreated={() => alert('Role definition created!')}
            />

            {selectedUser && (
                <EditUserRoleModal
                    isOpen={isEditRoleOpen}
                    onClose={() => setIsEditRoleOpen(false)}
                    userId={selectedUser.id}
                    currentUserRoles={selectedUser.userRoles?.map((ur: any) => ur.role.code) || []}
                    onRoleUpdated={handleRoleUpdated}
                />
            )}
        </div>
    );
};
