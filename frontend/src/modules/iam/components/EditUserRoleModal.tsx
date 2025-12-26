import React, { useState, useEffect } from 'react';
import { getRoles, assignRole } from '../api';

interface EditUserRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    currentUserRoles: string[]; // List of role codes
    onRoleUpdated: () => void;
}

export const EditUserRoleModal: React.FC<EditUserRoleModalProps> = ({ isOpen, onClose, userId, currentUserRoles, onRoleUpdated }) => {
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRoleId, setSelectedRoleId] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadRoles();
        }
    }, [isOpen]);

    // Pre-select current role when roles are loaded
    useEffect(() => {
        if (roles.length > 0 && currentUserRoles.length > 0) {
            const currentCode = currentUserRoles[0]; // Assuming single role
            const matchingRole = roles.find(r => r.code === currentCode);
            if (matchingRole) {
                setSelectedRoleId(matchingRole.id);
            }
        } else if (roles.length > 0 && currentUserRoles.length === 0) {
            setSelectedRoleId('');
        }
    }, [roles, currentUserRoles, isOpen]);

    const loadRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Failed to load roles', error);
        }
    };

    const handleAssign = async () => {
        if (!selectedRoleId) return;
        setLoading(true);
        try {
            const companyId = localStorage.getItem('current_company_id');
            if (!companyId) {
                alert('No active organization context found');
                return;
            }
            // Logic change: Backend now handles "Replace" logic automatically
            await assignRole(userId, selectedRoleId, companyId);
            onRoleUpdated();
            onClose();
        } catch (error: any) {
            console.error('Failed to assign role', error);
            const msg = error.response?.data?.message || 'Failed to assign role';
            alert(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

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
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Asignar Rol de Usuario</h3>
                <p className="text-sm text-gray-500 mb-6">Seleccione el rol único para este usuario en la organización. Se reemplazará cualquier rol anterior.</p>

                <div className="space-y-3 mb-8">
                    {roles.map(role => {
                        const isSelected = selectedRoleId === role.id;
                        return (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                        ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="roleSelect"
                                    value={role.id}
                                    checked={isSelected}
                                    onChange={() => setSelectedRoleId(role.id)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{role.name}</span>
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{role.code}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{role.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAssign}
                        disabled={!selectedRoleId || loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        {loading ? 'Guardando...' : 'Confirmar Cambio'}
                    </button>
                </div>
            </div>
        </div>
    );
};
