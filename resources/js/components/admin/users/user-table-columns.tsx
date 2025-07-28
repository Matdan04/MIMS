import { createColumnHelper } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Eye, Edit, Trash2, ToggleLeft, ToggleRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type User } from '@/types';

const columnHelper = createColumnHelper<User>();

export const getRoleColor = (roleName: string) => {
    switch (roleName) {
        case 'super_admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'school_admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'international_school': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
};

export const createUserTableColumns = (
    handleToggleStatus: (user: User) => void,
    handleDelete: (user: User) => void
) => [
    columnHelper.accessor('name', {
        id: 'user',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    User
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="space-y-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    {user.phone && (
                        <div className="text-sm text-muted-foreground">{user.phone}</div>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor('role.display_name', {
        id: 'role',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    Role
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            return user.role ? (
                <Badge className={getRoleColor(user.role.name)}>
                    {user.role.display_name}
                </Badge>
            ) : null;
        },
    }),
    columnHelper.accessor('is_active', {
        id: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    Status
                    {column.getIsSorted() === "asc" ? (
                        <ArrowUp className="ml-2 h-4 w-4" />
                    ) : column.getIsSorted() === "desc" ? (
                        <ArrowDown className="ml-2 h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                </Button>
            );
        },
        cell: ({ getValue }) => {
            const isActive = getValue();
            return (
                <Badge variant={isActive ? "default" : "secondary"}>
                    {isActive ? 'Active' : 'Inactive'}
                </Badge>
            );
        },
    }),
    columnHelper.accessor('last_login_at', {
        id: 'last_login',
        header: 'Last Login',
        enableSorting: false,
        cell: ({ getValue }) => {
            const lastLogin = getValue();
            return (
                <span className="text-sm text-muted-foreground">
                    {lastLogin ? new Date(lastLogin).toLocaleDateString() : 'Never'}
                </span>
            );
        },
    }),
    columnHelper.accessor('created_at', {
        id: 'created',
        header: 'Created',
        enableSorting: false,
        cell: ({ getValue }) => {
            const createdAt = getValue();
            return (
                <span className="text-sm text-muted-foreground">
                    {new Date(createdAt).toLocaleDateString()}
                </span>
            );
        },
    }),
    columnHelper.display({
        id: 'actions',
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/users/${user.id}`}>
                        <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={`/admin/users/${user.id}/edit`}>
                        <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleStatus(user)}
                    >
                        {user.is_active ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    }),
]; 