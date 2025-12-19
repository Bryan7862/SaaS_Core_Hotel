import React, { useEffect, useState } from 'react';
import { Plus, ArrowRight, Trash2 } from 'lucide-react';
import { getMyOrganizations, createOrganization } from '../api';
import { api } from '../../../lib/api';

export const OrganizationsPage = () => {
    // ... items ...

    const handleDeleteOrg = async (orgId: string) => {
        if (!window.confirm('Are you sure you want to suspend this organization? It can be restored from the Recycle Bin.')) return;
        try {
            await api.delete(`/organizations/${orgId}`);
            loadOrgs();
        } catch (error) {
            console.error('Failed to suspend organization', error);
            alert('Failed to suspend organization');
        }
    };
    const [orgs, setOrgs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newOrgName, setNewOrgName] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadOrgs();
    }, []);

    const loadOrgs = async () => {
        try {
            const data = await getMyOrganizations();
            setOrgs(data);
        } catch (error) {
            console.error('Failed to load organizations', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newOrgName.trim()) return;

        setCreating(true);
        try {
            await createOrganization(newOrgName);
            setNewOrgName('');
            setShowCreate(false);
            loadOrgs();
        } catch (error: any) {
            console.error('Failed to create organization', error);
            const msg = error.response?.data?.message || error.message || 'Failed to create organization';
            alert(`Error: ${JSON.stringify(msg)}`);
        } finally {
            setCreating(false);
        }
    };

    const handleSelect = (orgId: string) => {
        localStorage.setItem('current_company_id', orgId);
        // Force a simplified reload for now to ensure headers are picked up
        window.location.href = '/';
    };

    if (loading) return <div className="p-8 text-center">Loading your organizations...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        My Organizations
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Select an organization to manage or create a new one.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Create New Card */}
                    <div
                        onClick={() => setShowCreate(true)}
                        className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-48"
                    >
                        <div className="p-3 rounded-full bg-gray-100 group-hover:bg-indigo-50 transition-colors">
                            <Plus className="h-8 w-8 text-gray-400 group-hover:text-indigo-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 group-hover:text-indigo-600">Create New</h3>
                    </div>

                    {/* Organization Cards */}
                    {orgs.map((org) => (
                        <div key={org.id} className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 flex flex-col h-48">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        {org.logoUrl ? (
                                            <img className="h-10 w-10 rounded-full" src={org.logoUrl} alt="" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                {org.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 truncate">{org.name}</h3>
                                </div>
                                <p className="mt-4 text-xs text-gray-500 font-mono bg-gray-50 p-1 rounded inline-block">
                                    {org.slug}
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => handleSelect(org.id)}
                                    className="col-span-3 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Enter <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteOrg(org.id);
                                    }}
                                    className="col-span-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    title="Suspend Organization"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Modal (Simple inline absolute for now) */}
                {showCreate && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Organization</h3>
                            <form onSubmit={handleCreate}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                    <input
                                        type="text"
                                        autoFocus
                                        required
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        value={newOrgName}
                                        onChange={(e) => setNewOrgName(e.target.value)}
                                        placeholder="e.g. Acme Corp"
                                    />
                                </div>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreate(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={creating}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {creating ? 'Creating...' : 'Create Organization'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
