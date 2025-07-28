import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type User } from '@/types';

interface UserAccountDetailsCardProps {
    user: User;
}

export function UserAccountDetailsCard({ user }: UserAccountDetailsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">User ID</label>
                    <p className="text-sm font-mono">{user.id}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                    <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>

                <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-sm">{new Date(user.updated_at).toLocaleDateString()}</p>
                </div>

                {user.last_login_at && (
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                        <p className="text-sm">{new Date(user.last_login_at).toLocaleDateString()}</p>
                    </div>
                )}

                {user.email_verified_at && (
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email Verified At</label>
                        <p className="text-sm">{new Date(user.email_verified_at).toLocaleDateString()}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 