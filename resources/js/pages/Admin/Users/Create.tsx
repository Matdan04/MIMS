import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/admin/users/user-form';
import { useUserForm } from '@/hooks/use-user-form';
import { type BreadcrumbItem, type Role, type PageProps } from '@/types';

interface Props extends PageProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User Management', href: '/admin/users' },
    { title: 'Create User', href: '/admin/users/create' },
];

export default function CreateUser({ roles }: Props) {
    const {
        data,
        updateField,
        handleSubmit,
        processing,
        errors,
    } = useUserForm({ roles });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/users">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Users
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Create New User</h1>
                </div>

                {/* Form */}
                <UserForm
                    data={data}
                    errors={errors}
                    roles={roles}
                    processing={processing}
                    isEditing={false}
                    onFieldChange={updateField}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}