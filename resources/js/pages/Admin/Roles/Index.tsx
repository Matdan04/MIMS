import { Head, Link } from '@inertiajs/react';
import { Shield, Plus } from 'lucide-react';
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
import { RoleFilters } from '@/components/admin/roles/role-filters';
import { RolePagination } from '@/components/admin/roles/role-pagination';
import { useRoleTable } from '@/hooks/use-role-table';
import { type BreadcrumbItem, type Role, type PageProps } from '@/types';

interface Props extends PageProps {
    roles: {
        data: (Role & { users_count: number; permissions_count: number })[];
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            from: number;
            to: number;
            total: number;
        };
    };
    filters: {
        search?: string;
        status?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Role Management', href: '/admin/roles' },
];

export default function RolesIndex({ roles, filters }: Props) {
    const {
        table,
        columns,
        search,
        selectedStatus,
        setSearch,
        setSelectedStatus,
        handleSearch,
        handleReset,
        handleSearchKeyDown,
    } = useRoleTable({ roles: roles.data, filters });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Management" />
            
            <div className="space-y-6 m-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold">Role Management</h1>
                    </div>
                    <Link href="/admin/roles/create">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Role
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <RoleFilters
                    search={search}
                    selectedStatus={selectedStatus}
                    onSearchChange={setSearch}
                    onStatusChange={setSelectedStatus}
                    onApply={handleSearch}
                    onReset={handleReset}
                    onSearchKeyDown={handleSearchKeyDown}
                />

                {/* Roles Table */}
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
                                                No roles found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <RolePagination links={roles.links} />
            </div>
        </AppLayout>
    );
}