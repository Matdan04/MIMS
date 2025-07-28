import { useState, useMemo, useEffect } from 'react';
import { router } from '@inertiajs/react';
import {
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
} from '@tanstack/react-table';
import { createUserTableColumns } from '@/components/admin/users/user-table-columns';
import { useUserActions } from './use-user-actions';
import { type User, type Role } from '@/types';

interface UseUserTableProps {
    users: User[];
    filters: {
        search?: string;
        role?: string;
        status?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}

export function useUserTable({ users, filters }: UseUserTableProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [sorting, setSorting] = useState<SortingState>(() => {
        if (filters.sort_by && filters.sort_direction) {
            return [{ id: filters.sort_by, desc: filters.sort_direction === 'desc' }];
        }
        return [];
    });

    const { handleToggleStatus, handleDelete } = useUserActions();

    const columns = useMemo(() => 
        createUserTableColumns(handleToggleStatus, handleDelete), 
        [handleToggleStatus, handleDelete]
    );

    const table = useReactTable({
        data: users,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualSorting: true, // We handle sorting on the server side
    });

    const handleSearch = () => {
        const sortingState = sorting[0];
        router.get('/admin/users', {
            search: search || undefined,
            role: selectedRole === 'all' ? undefined : selectedRole,
            status: selectedStatus === 'all' ? undefined : selectedStatus,
            sort_by: sortingState?.id || undefined,
            sort_direction: sortingState ? (sortingState.desc ? 'desc' : 'asc') : undefined,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setSelectedRole('all');
        setSelectedStatus('all');
        setSorting([]);
        router.get('/admin/users', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Update URL when sorting changes
    useEffect(() => {
        const sortingState = sorting[0];
        const currentSort = filters.sort_by;
        const currentDirection = filters.sort_direction;
        
        if (sortingState) {
            const newSort = sortingState.id;
            const newDirection = sortingState.desc ? 'desc' : 'asc';
            
            if (currentSort !== newSort || currentDirection !== newDirection) {
                router.get('/admin/users', {
                    search: search || undefined,
                    role: selectedRole === 'all' ? undefined : selectedRole,
                    status: selectedStatus === 'all' ? undefined : selectedStatus,
                    sort_by: newSort,
                    sort_direction: newDirection,
                }, {
                    preserveState: true,
                    replace: true,
                });
            }
        } else if (currentSort) {
            // Clear sorting
            router.get('/admin/users', {
                search: search || undefined,
                role: selectedRole === 'all' ? undefined : selectedRole,
                status: selectedStatus === 'all' ? undefined : selectedStatus,
            }, {
                preserveState: true,
                replace: true,
            });
        }
    }, [sorting, search, selectedRole, selectedStatus, filters.sort_by, filters.sort_direction]);

    return {
        // Table instance
        table,
        columns,
        
        // Filter states
        search,
        selectedRole,
        selectedStatus,
        
        // Filter handlers
        setSearch,
        setSelectedRole,
        setSelectedStatus,
        handleSearch,
        handleReset,
        handleSearchKeyDown,
    };
} 