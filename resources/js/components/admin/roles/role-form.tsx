import { Link } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleBasicInfoFields } from './role-basic-info-fields';
import { RolePermissionFields } from './role-permission-fields';
import { RoleStatusField } from './role-status-field';
import { useRoleForm } from '@/hooks/use-role-form';
import { type Role, type Permission } from '@/types';

interface RoleFormProps {
    role?: Role & { permissions: Permission[] };
    permissions: Record<string, Permission[]>;
}

export function RoleForm({ role, permissions }: RoleFormProps) {
    const {
        data,
        errors,
        processing,
        handleFieldChange,
        handleSubmit,
    } = useRoleForm({ role });

    const isEditing = !!role;

    return (
        <div className="max-w-4xl">
            <form onSubmit={(e) => handleSubmit(e, role?.id)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <RoleBasicInfoFields
                                data={{
                                    name: data.name,
                                    display_name: data.display_name,
                                    description: data.description,
                                }}
                                errors={{
                                    name: errors.name,
                                    display_name: errors.display_name,
                                    description: errors.description,
                                }}
                                onFieldChange={handleFieldChange}
                            />
                            <RoleStatusField
                                checked={data.is_active}
                                error={errors.is_active}
                                onCheckedChange={(checked) => handleFieldChange('is_active', checked)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Select the permissions that users with this role should have.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <RolePermissionFields
                            permissions={permissions}
                            selectedPermissions={data.permissions}
                            error={errors.permissions}
                            onPermissionsChange={(permissions) => handleFieldChange('permissions', permissions)}
                        />
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t">
                    <Link href="/admin/roles">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={processing}>
                        <Save className="h-4 w-4 mr-2" />
                        {processing ? 
                            (isEditing ? 'Updating...' : 'Creating...') : 
                            (isEditing ? 'Update Role' : 'Create Role')
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
}