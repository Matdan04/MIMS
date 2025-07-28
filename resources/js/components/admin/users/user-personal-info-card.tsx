import { Mail, Phone, Shield, Activity, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRoleColor } from './user-table-columns';
import { type User } from '@/types';

interface UserPersonalInfoCardProps {
    user: User;
}

export function UserPersonalInfoCard({ user }: UserPersonalInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                            <p className="text-lg font-medium">{user.name}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm">{user.email}</p>
                            </div>
                        </div>

                        {user.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                    <p className="text-sm">{user.phone}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                {user.role && (
                                    <div className="mt-1">
                                        <Badge className={getRoleColor(user.role.name)}>
                                            {user.role.display_name}
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <Badge variant={user.is_active ? "default" : "secondary"}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
                                <div className="mt-1">
                                    <Badge variant={user.email_verified_at ? "default" : "secondary"}>
                                        {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 