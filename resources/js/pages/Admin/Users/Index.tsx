import { Head, Link } from '@inertiajs/react';
import { Users, Plus } from 'lucide-react';
import { flexRender } from '@tanstack/react-table';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UserFilters } from '@/components/admin/users/user-filters';
import { UserPagination } from '@/components/admin/users/user-pagination';
import { useUserTable } from '@/hooks/use-user-table';
import { type BreadcrumbItem, type User, type Role, type PageProps } from '@/types';

interface Props extends PageProps {
    users: {
        data: User[];
        links: any[];
        meta: any;
    };
    roles: Role[];
    filters: {
        search?: string;
        role?: string;
        status?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'User Management', href: '/admin/users' },
];

export default function UsersIndex({ users, roles, filters }: Props) {
    const {
        table,
        columns,
        search,
        selectedRole,
        selectedStatus,
        setSearch,
        setSelectedRole,
        setSelectedStatus,
        handleSearch,
        handleReset,
        handleSearchKeyDown,
    } = useUserTable({ users: users.data, filters });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">User Management</h1>
                    </div>
                    <Link href="/admin/users/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add User
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <UserFilters
                    search={search}
                    selectedRole={selectedRole}
                    selectedStatus={selectedStatus}
                    roles={roles}
                    onSearchChange={setSearch}
                    onRoleChange={setSelectedRole}
                    onStatusChange={setSelectedStatus}
                    onApply={handleSearch}
                    onReset={handleReset}
                    onSearchKeyDown={handleSearchKeyDown}
                />

                {/* Users Table */}
                <Card>
                    <CardContent className="p-0 mx-4">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <UserPagination links={users.links} />
            </div>
        </AppLayout>
    );
}