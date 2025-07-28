import { useForm } from '@inertiajs/react';
import { type Role } from '@/types';

interface UserFormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    role_id: string;
    is_active: boolean;
}

interface UseUserFormProps {
    initialData?: Partial<UserFormData>;
    roles: Role[];
    isEditing?: boolean;
}

export function useUserForm({ initialData, roles, isEditing = false }: UseUserFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<UserFormData>({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role_id: 'none',
        is_active: true,
        ...initialData,
    });

    const handleSubmit = (e: React.FormEvent, userId?: string) => {
        e.preventDefault();
        
        // Transform role_id before submission
        const submitData = { ...data };
        if (submitData.role_id === 'none') {
            submitData.role_id = '';
        }

        if (isEditing && userId) {
            put(`/admin/users/${userId}`, {
                data: submitData,
            });
        } else {
            post('/admin/users', {
                data: submitData,
            });
        }
    };

    const updateField = (field: string, value: any) => {
        setData(field as keyof UserFormData, value);
    };

    const resetForm = () => {
        reset();
    };

    return {
        data,
        setData,
        updateField,
        handleSubmit,
        resetForm,
        processing,
        errors,
        roles,
    };
} 