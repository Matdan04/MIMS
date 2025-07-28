import React from 'react';
import { router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface RolePaginationProps {
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
}

export function RolePagination({ links }: RolePaginationProps) {
    if (!links || links.length <= 3) {
        return null;
    }

    const renderPaginationItems = () => {
        const items: React.ReactNode[] = [];
        
        links.forEach((link, index) => {
            if (index === 0) {
                items.push(
                    <PaginationItem key="prev">
                        <PaginationPrevious 
                            href={link.url || '#'}
                            onClick={(e) => {
                                e.preventDefault();
                                if (link.url) router.get(link.url);
                            }}
                            className={!link.url ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                );
            } else if (index === links.length - 1) {
                items.push(
                    <PaginationItem key="next">
                        <PaginationNext 
                            href={link.url || '#'}
                            onClick={(e) => {
                                e.preventDefault();
                                if (link.url) router.get(link.url);
                            }}
                            className={!link.url ? 'pointer-events-none opacity-50' : ''}
                        />
                    </PaginationItem>
                );
            } else {
                if (link.label === '...') {
                    items.push(
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    );
                } else {
                    items.push(
                        <PaginationItem key={index}>
                            <PaginationLink
                                href={link.url || '#'}
                                isActive={link.active}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) router.get(link.url);
                                }}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            }
        });
        
        return items;
    };

    return (
        <div className="flex justify-center">
            <Pagination>
                <PaginationContent>
                    {renderPaginationItems()}
                </PaginationContent>
            </Pagination>
        </div>
    );
}