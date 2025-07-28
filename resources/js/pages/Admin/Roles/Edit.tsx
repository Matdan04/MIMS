import { Head, Link } from '@inertiajs/react';
import { Shield, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleForm } from '@/components/admin/roles/role-form';
import { type BreadcrumbItem, type Role, type Permission, type PageProps } from '@/types';

interface Props extends PageProps {
    role: Role & { permissions: Permission[] };
    permissions: Record<string, Permission[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Role Management', href: '/admin/roles' },
    { title: 'Edit Role', href: '' },
];

export default function EditRole({ role, permissions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${role.display_name}`} />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Edit Role: {role.display_name}</h1>
                    </div>
                    <Link href="/admin/roles">
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Roles
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                        <CardDescription>
                            Update role details and modify permissions to control access to different parts of the system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RoleForm role={role} permissions={permissions} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}