import { createColumnHelper } from '@tanstack/react-table';
import { Link } from '@inertiajs/react';
import { Eye, Edit, Trash2, ToggleLeft, ToggleRight, ArrowUpDown, ArrowUp, ArrowDown, Users, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Role } from '@/types';

const columnHelper = createColumnHelper<Role & { users_count: number; permissions_count: number }>();

export const createRoleTableColumns = (
    handleToggleStatus: (role: Role) => void,
    handleDelete: (role: Role) => void
) => [
    columnHelper.accessor('display_name', {
        id: 'name',
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
            const role = row.original;
            return (
                <div className="space-y-1">
                    <div className="font-medium">{role.display_name}</div>
                    <div className="text-sm text-muted-foreground">{role.name}</div>
                    {role.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {role.description}
                        </div>
                    )}
                </div>
            );
        },
    }),
    columnHelper.accessor('users_count', {
        id: 'users_count',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    <Users className="h-4 w-4 mr-1" />
                    Users
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
            const count = getValue();
            return (
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        {count}
                    </Badge>
                </div>
            );
        },
    }),
    columnHelper.accessor('permissions_count', {
        id: 'permissions_count',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    <Key className="h-4 w-4 mr-1" />
                    Permissions
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
            const count = getValue();
            return (
                <div className="flex items-center gap-2">
                    <Badge variant="outline">
                        {count}
                    </Badge>
                </div>
            );
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
            const role = row.original;
            return (
                <div className="flex items-center justify-center gap-2">
                    <Link href={`/admin/roles/${role.id}`}>
                        <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href={`/admin/roles/${role.id}/edit`}>
                        <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleStatus(role)}
                    >
                        {role.is_active ? (
                            <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(role)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    }),
];