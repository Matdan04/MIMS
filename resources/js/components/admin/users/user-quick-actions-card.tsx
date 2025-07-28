import { Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type User } from '@/types';

interface UserQuickActionsCardProps {
    user: User;
}

export function UserQuickActionsCard({ user }: UserQuickActionsCardProps) {
    return (
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
    );
} 