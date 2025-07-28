import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface RoleBasicInfoFieldsProps {
    data: {
        name: string;
        display_name: string;
        description: string;
    };
    errors: {
        name?: string;
        display_name?: string;
        description?: string;
    };
    onFieldChange: (field: string, value: string) => void;
}

export function RoleBasicInfoFields({
    data,
    errors,
    onFieldChange,
}: RoleBasicInfoFieldsProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                    Name *
                </Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    placeholder="e.g., admin, user, moderator"
                    className={errors.name ? 'border-red-500' : ''}
                />
                <p className="text-xs text-muted-foreground">
                    System name (lowercase, underscores only)
                </p>
                <InputError message={errors.name} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="display_name" className="text-sm font-medium">
                    Display Name *
                </Label>
                <Input
                    id="display_name"
                    type="text"
                    value={data.display_name}
                    onChange={(e) => onFieldChange('display_name', e.target.value)}
                    placeholder="e.g., Administrator, User, Moderator"
                    className={errors.display_name ? 'border-red-500' : ''}
                />
                <InputError message={errors.display_name} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                    Description
                </Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => onFieldChange('description', e.target.value)}
                    placeholder="Brief description of the role"
                    rows={3}
                    className={errors.description ? 'border-red-500' : ''}
                />
                <InputError message={errors.description} />
            </div>
        </div>
    );
}