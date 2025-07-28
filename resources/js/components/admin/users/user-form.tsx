import { Link } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserBasicInfoFields } from './user-basic-info-fields';
import { UserPasswordFields } from './user-password-fields';
import { UserRoleField } from './user-role-field';
import { UserStatusField } from './user-status-field';
import { type Role } from '@/types';

interface UserFormProps {
    data: {
        name: string;
        email: string;
        phone: string;
        password: string;
        password_confirmation: string;
        role_id: string;
        is_active: boolean;
    };
    errors: {
        name?: string;
        email?: string;
        phone?: string;
        password?: string;
        password_confirmation?: string;
        role_id?: string;
        is_active?: string;
    };
    roles: Role[];
    processing: boolean;
    isEditing?: boolean;
    onFieldChange: (field: string, value: any) => void;
    onSubmit: (e: React.FormEvent, userId?: string) => void;
    userId?: string;
}

export function UserForm({
    data,
    errors,
    roles,
    processing,
    isEditing = false,
    onFieldChange,
    onSubmit,
    userId,
}: UserFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        onSubmit(e, userId);
    };

    return (
        <div className="max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isEditing ? 'Edit User Information' : 'User Information'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <UserBasicInfoFields
                            data={{
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                            }}
                            errors={{
                                name: errors.name,
                                email: errors.email,
                                phone: errors.phone,
                            }}
                            onFieldChange={onFieldChange}
                        />

                        <UserPasswordFields
                            data={{
                                password: data.password,
                                password_confirmation: data.password_confirmation,
                            }}
                            errors={{
                                password: errors.password,
                                password_confirmation: errors.password_confirmation,
                            }}
                            onFieldChange={onFieldChange}
                            isEditing={isEditing}
                        />

                        <UserRoleField
                            value={data.role_id}
                            roles={roles}
                            error={errors.role_id}
                            onValueChange={(value) => onFieldChange('role_id', value)}
                        />

                        <UserStatusField
                            checked={data.is_active}
                            error={errors.is_active}
                            onCheckedChange={(checked) => onFieldChange('is_active', checked)}
                        />

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t">
                            <Link href="/admin/users">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                <Save className="h-4 w-4 mr-2" />
                                {processing ? 
                                    (isEditing ? 'Updating...' : 'Creating...') : 
                                    (isEditing ? 'Update User' : 'Create User')
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 