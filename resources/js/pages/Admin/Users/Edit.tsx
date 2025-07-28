import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/admin/users/user-form';
import { useUserForm } from '@/hooks/use-user-form';
import { type BreadcrumbItem, type User, type Role, type PageProps } from '@/types';

interface Props extends PageProps {
    user: User;
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User Management', href: '/admin/users' },
    { title: 'Edit User', href: '#' },
];

export default function EditUser({ user, roles }: Props) {
    const {
        data,
        updateField,
        handleSubmit,
        processing,
        errors,
    } = useUserForm({ 
        initialData: {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
            password_confirmation: '',
            role_id: user.role_id?.toString() || 'none',
            is_active: user.is_active ?? true,
        },
        roles,
        isEditing: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.name}`} />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/users">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Users
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Edit User - {user.name}</h1>
                </div>

                {/* Form */}
                <UserForm
                    data={data}
                    errors={errors}
                    roles={roles}
                    processing={processing}
                    isEditing={true}
                    onFieldChange={updateField}
                    onSubmit={handleSubmit}
                    userId={user.id.toString()}
                />
            </div>
        </AppLayout>
    );
}