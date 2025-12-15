import axios from 'axios';

const API_URL = 'http://localhost:3000/admin';

export const getRoles = async () => {
    const response = await axios.get(`${API_URL}/iam/roles`);
    return response.data;
};

export const getUsers = async () => {
    // Reusing Auth Module endpoint which returns users + roles
    const response = await axios.get(`${API_URL}/auth/users`);
    return response.data;
};

export const assignRole = async (userId: string, roleId: string, companyId?: string) => {
    const response = await axios.post(`${API_URL}/iam/users/assign-role`, {
        userId,
        roleId,
        companyId,
    });
    return response.data;
};
