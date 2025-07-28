import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';
import { type Permission } from '@/types';

interface RolePermissionFieldsProps {
    permissions: Record<string, Permission[]>;
    selectedPermissions: number[];
    error?: string;
    onPermissionsChange: (permissions: number[]) => void;
}

export function RolePermissionFields({
    permissions,
    selectedPermissions,
    error,
    onPermissionsChange,
}: RolePermissionFieldsProps) {
    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        if (checked) {
            onPermissionsChange([...selectedPermissions, permissionId]);
        } else {
            onPermissionsChange(selectedPermissions.filter(id => id !== permissionId));
        }
    };

    const handleModuleToggle = (modulePermissions: Permission[], checked: boolean) => {
        const modulePermissionIds = modulePermissions.map(p => p.id);
        
        if (checked) {
            const newPermissions = [...selectedPermissions];
            modulePermissionIds.forEach(id => {
                if (!newPermissions.includes(id)) {
                    newPermissions.push(id);
                }
            });
            onPermissionsChange(newPermissions);
        } else {
            onPermissionsChange(selectedPermissions.filter(id => !modulePermissionIds.includes(id)));
        }
    };

    const isModuleFullySelected = (modulePermissions: Permission[]) => {
        return modulePermissions.every(p => selectedPermissions.includes(p.id));
    };

    const isModulePartiallySelected = (modulePermissions: Permission[]) => {
        return modulePermissions.some(p => selectedPermissions.includes(p.id)) && 
               !isModuleFullySelected(modulePermissions);
    };

    return (
        <div className="space-y-6">
            {Object.entries(permissions).map(([module, modulePermissions], index) => (
                <div key={module}>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id={`module-${module}`}
                                checked={isModuleFullySelected(modulePermissions)}
                                onCheckedChange={(checked) => handleModuleToggle(modulePermissions, checked as boolean)}
                                className={isModulePartiallySelected(modulePermissions) ? 'data-[state=checked]:bg-primary/50' : ''}
                            />
                            <Label
                                htmlFor={`module-${module}`}
                                className="text-sm font-semibold uppercase tracking-wide cursor-pointer"
                            >
                                {module}
                            </Label>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                            {modulePermissions.map((permission) => (
                                <div key={permission.id} className="flex items-start space-x-2">
                                    <Checkbox
                                        id={`permission-${permission.id}`}
                                        checked={selectedPermissions.includes(permission.id)}
                                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label
                                            htmlFor={`permission-${permission.id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {permission.display_name}
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            {permission.name}
                                        </p>
                                        {permission.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {permission.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {index < Object.keys(permissions).length - 1 && (
                        <Separator className="mt-6" />
                    )}
                </div>
            ))}
            
            <InputError message={error} />
        </div>
    );
}