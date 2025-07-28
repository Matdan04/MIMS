import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface RoleStatusFieldProps {
    checked: boolean;
    error?: string;
    onCheckedChange: (checked: boolean) => void;
}

export function RoleStatusField({
    checked,
    error,
    onCheckedChange,
}: RoleStatusFieldProps) {
    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is_active"
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                />
                <Label
                    htmlFor="is_active"
                    className="text-sm font-normal cursor-pointer"
                >
                    Active
                </Label>
            </div>
            <p className="text-xs text-muted-foreground">
                Inactive roles cannot be assigned to users
            </p>
            <InputError message={error} />
        </div>
    );
}