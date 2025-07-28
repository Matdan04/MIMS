import { router } from '@inertiajs/react';
import { type User } from '@/types';

export function useUserActions() {
    const handleToggleStatus = (user: User) => {
        router.patch(`/admin/users/${user.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
            });
        }
    };

    return {
        handleToggleStatus,
        handleDelete,
    };
} 