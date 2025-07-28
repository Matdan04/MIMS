import { Head, Link } from '@inertiajs/react';
import { Shield, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleForm } from '@/components/admin/roles/role-form';
import { type BreadcrumbItem, type Permission, type PageProps } from '@/types';

interface Props extends PageProps {
    permissions: Record<string, Permission[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Role Management', href: '/admin/roles' },
    { title: 'Create Role', href: '/admin/roles/create' },
];

export default function CreateRole({ permissions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Create Role</h1>
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
                            Create a new role and assign permissions to control access to different parts of the system.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RoleForm permissions={permissions} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}