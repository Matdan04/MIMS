import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleFiltersProps {
    search: string;
    selectedStatus: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onApply: () => void;
    onReset: () => void;
    onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function RoleFilters({
    search,
    selectedStatus,
    onSearchChange,
    onStatusChange,
    onApply,
    onReset,
    onSearchKeyDown,
}: RoleFiltersProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Filter</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search roles..."
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="pl-9"
                                onKeyDown={onSearchKeyDown}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <Select value={selectedStatus} onValueChange={onStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium invisible">Actions</label>
                        <div className="flex gap-2">
                            <Button onClick={onApply} className="flex-1">
                                <Filter className="h-4 w-4 mr-2" />
                                Apply
                            </Button>
                            <Button variant="outline" onClick={onReset}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}