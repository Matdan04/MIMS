import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type User } from '@/types';

interface UserRolePermissionsCardProps {
    user: User;
}

export function UserRolePermissionsCard({ user }: UserRolePermissionsCardProps) {
    if (!user.role) {
        return null;
    }

    return (
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
    );
} 