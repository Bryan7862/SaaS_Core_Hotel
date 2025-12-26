import { api } from '../../lib/api';

export const getRoles = async () => {
    const response = await api.get('/admin/iam/roles');
    return response.data;
};

export const getPermissions = async () => {
    const response = await api.get('/admin/iam/permissions');
    return response.data;
};

export const getUsers = async () => {
    // Reusing Auth Module endpoint which returns users + roles
    const response = await api.get('/admin/auth/users');
    return response.data;
};

export const assignRole = async (userId: string, roleId: string, companyId: string) => {
    return api.post('/admin/iam/users/assign-role', { userId, roleId, companyId });
};

export const syncRolePermissions = async (roleId: string, permissionIds: string[]) => {
    return api.post(`/admin/iam/roles/${roleId}/permissions/sync`, { permissionIds });
};

// Also export createRole if not already there, assuming CreateRoleModal uses axios directly or we standardize here.
// CreateRoleModal used direct axios. Ideally we move it here but I won't break it now.
