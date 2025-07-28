import { router } from '@inertiajs/react';
import { type Role } from '@/types';

export function useRoleActions() {
    const handleToggleStatus = (role: Role) => {
        router.patch(`/admin/roles/${role.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (role: Role) => {
        if (confirm(`Are you sure you want to delete the role "${role.display_name}"?`)) {
            router.delete(`/admin/roles/${role.id}`, {
                preserveScroll: true,
            });
        }
    };

    return {
        handleToggleStatus,
        handleDelete,
    };
}