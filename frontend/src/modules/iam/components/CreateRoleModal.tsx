import React, { useState } from 'react';
import { createRole } from '../api';

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRoleCreated: () => void;
}

export const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ isOpen, onClose, onRoleCreated }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createRole({
                code,
                name,
                description,
            });
            onRoleCreated();
            onClose();
            // Reset form
            setCode('');
            setName('');
            setDescription('');
        } catch (err: any) {
            console.error('Failed to create role', err);
            setError(err.response?.data?.message || 'Failed to create role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '500px'
            }}>
                <h2 className="text-xl font-bold mb-4">Create New Role</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code (System Identifier)</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="e.g. MANAGER"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Uppercase, no spaces.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Project Manager"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Role'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
