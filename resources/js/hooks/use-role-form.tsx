import { useForm } from '@inertiajs/react';
import { type Role, type Permission } from '@/types';

interface RoleFormData {
    name: string;
    display_name: string;
    description: string;
    is_active: boolean;
    permissions: number[];
    [key: string]: any;
}

interface UseRoleFormProps {
    role?: Role & { permissions: Permission[] };
}

export function useRoleForm({ role }: UseRoleFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<RoleFormData>({
        name: role?.name || '',
        display_name: role?.display_name || '',
        description: role?.description || '',
        is_active: role?.is_active ?? true,
        permissions: role?.permissions?.map(p => p.id) || [],
    });

    const handleSubmit = (e: React.FormEvent, roleId?: number) => {
        e.preventDefault();

        if (roleId) {
            put(`/admin/roles/${roleId}`, {
                preserveScroll: true,
            });
        } else {
            post('/admin/roles', {
                preserveScroll: true,
            });
        }
    };

    const handleFieldChange = (field: string, value: unknown) => {
        setData(field as keyof RoleFormData, value);
    };

    const resetForm = () => {
        reset();
    };

    return {
        data,
        setData,
        handleFieldChange,
        handleSubmit,
        resetForm,
        processing,
        errors,
    };
}