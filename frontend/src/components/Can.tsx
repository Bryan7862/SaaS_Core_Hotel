import React from 'react';
import { useAuth } from '../context/AuthContext';

interface Props {
    resource: string;
    action: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const Can: React.FC<Props> = ({ resource, action, children, fallback = null }) => {
    const { user, loading } = useAuth();

    if (loading) return null; // Or a skeleton?

    if (!user) return <>{fallback}</>;

    const requiredPermission = `${resource}:${action}`;

    // Check if user has permission
    // Assuming backend sends flattened permissions in 'user.permissions'
    if (user.permissions?.includes(requiredPermission)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
