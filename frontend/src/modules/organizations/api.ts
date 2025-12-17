import { api } from '../../lib/api';

export interface Organization {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export const getMyOrganizations = async (): Promise<Organization[]> => {
    const response = await api.get('/organizations/my-organizations');
    return response.data;
};

export const createOrganization = async (name: string, slug?: string): Promise<Organization> => {
    const response = await api.post('/organizations', { name, slug });
    return response.data;
};

export const getOrganization = async (id: string): Promise<Organization> => {
    const response = await api.get(`/organizations/${id}`);
    return response.data;
};
