import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Phone, Calendar, Shield, Activity } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem, type User, type PageProps } from '@/types';

interface Props extends PageProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User Management', href: '/admin/users' },
    { title: 'User Details', href: '#' },
];

export default function ShowUser({ user }: Props) {
    const getRoleColor = (roleName: string) => {
        switch (roleName) {
            case 'super_admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'school_admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'international_school': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.name}`} />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/users">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Users
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-semibold">User Details</h1>
                    </div>
                    <Link href={`/admin/users/${user.id}/edit`}>
                        <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                            <p className="text-lg font-medium">{user.name}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                                <p className="text-sm">{user.email}</p>
                                            </div>
                                        </div>

                                        {user.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                                    <p className="text-sm">{user.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                                {user.role && (
                                                    <div className="mt-1">
                                                        <Badge className={getRoleColor(user.role.name)}>
                                                            {user.role.display_name}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                                <div className="mt-1">
                                                    <Badge variant={user.is_active ? "default" : "secondary"}>
                                                        {user.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
                                                <div className="mt-1">
                                                    <Badge variant={user.email_verified_at ? "default" : "secondary"}>
                                                        {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Role Details */}
                        {user.role && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Role & Permissions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Role Description</label>
                                        <p className="text-sm mt-1">{user.role.description || 'No description available'}</p>
                                    </div>
                                    
                                    {user.additional_permissions && user.additional_permissions.length > 0 && (
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">Additional Permissions</label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {user.additional_permissions.map((permission, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {permission}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">User ID</label>
                                    <p className="text-sm font-mono">{user.id}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                                    <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p className="text-sm">{new Date(user.updated_at).toLocaleDateString()}</p>
                                </div>

                                {user.last_login_at && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                                        <p className="text-sm">{new Date(user.last_login_at).toLocaleDateString()}</p>
                                    </div>
                                )}

                                {user.email_verified_at && (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email Verified At</label>
                                        <p className="text-sm">{new Date(user.email_verified_at).toLocaleDateString()}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={`/admin/users/${user.id}/edit`} className="block">
                                    <Button variant="outline" className="w-full">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit User
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}