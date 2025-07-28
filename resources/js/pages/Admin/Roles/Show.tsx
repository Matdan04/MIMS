import { Head, Link } from '@inertiajs/react';
import { Shield, ArrowLeft, Edit, Users, Key } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem, type Role, type Permission, type User, type PageProps } from '@/types';

interface Props extends PageProps {
    role: Role & { 
        permissions: Permission[];
        users: Pick<User, 'id' | 'name' | 'email'>[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Role Management', href: '/admin/roles' },
    { title: 'Role Details', href: '' },
];

export default function ShowRole({ role }: Props) {
    const permissionsByModule = role.permissions.reduce((acc, permission) => {
        if (!acc[permission.module]) {
            acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${role.display_name} Details`} />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">{role.display_name}</h1>
                        <Badge variant={role.is_active ? 'default' : 'secondary'}>
                            {role.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/roles/${role.id}/edit`}>
                            <Button>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Role
                            </Button>
                        </Link>
                        <Link href="/admin/roles">
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Roles
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Role Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Role Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="text-sm mt-1">{role.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                                <p className="text-sm mt-1">{role.display_name}</p>
                            </div>
                            {role.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="text-sm mt-1">{role.description}</p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <Badge variant={role.is_active ? 'default' : 'secondary'}>
                                        {role.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Created</label>
                                <p className="text-sm mt-1">{new Date(role.created_at).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assigned Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Assigned Users ({role.users.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {role.users.length > 0 ? (
                                <div className="space-y-3">
                                    {role.users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No users assigned to this role.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Permissions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Permissions ({role.permissions.length})
                        </CardTitle>
                        <CardDescription>
                            Permissions granted to users with this role
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(permissionsByModule).length > 0 ? (
                            <div className="space-y-6">
                                {Object.entries(permissionsByModule).map(([module, permissions]) => (
                                    <div key={module}>
                                        <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                                            {module}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                                                    <div>
                                                        <p className="font-medium text-sm">{permission.display_name}</p>
                                                        <p className="text-xs text-muted-foreground">{permission.name}</p>
                                                        {permission.description && (
                                                            <p className="text-xs text-muted-foreground mt-1">{permission.description}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {Object.keys(permissionsByModule).indexOf(module) < Object.keys(permissionsByModule).length - 1 && (
                                            <Separator className="mt-6" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No permissions assigned to this role.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}