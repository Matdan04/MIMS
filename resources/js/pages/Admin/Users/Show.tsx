import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { UserPersonalInfoCard } from '@/components/admin/users/user-personal-info-card';
import { UserRolePermissionsCard } from '@/components/admin/users/user-role-permissions-card';
import { UserAccountDetailsCard } from '@/components/admin/users/user-account-details-card';
import { UserQuickActionsCard } from '@/components/admin/users/user-quick-actions-card';
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
                        <UserPersonalInfoCard user={user} />
                        
                        <UserRolePermissionsCard user={user} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <UserAccountDetailsCard user={user} />
                        
                        <UserQuickActionsCard user={user} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}