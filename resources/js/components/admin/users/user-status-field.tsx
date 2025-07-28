import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';

interface UserStatusFieldProps {
    checked: boolean;
    error?: string;
    onCheckedChange: (checked: boolean) => void;
}

export function UserStatusField({ checked, error, onCheckedChange }: UserStatusFieldProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="is_active"
                    checked={checked}
                    onCheckedChange={(checked) => onCheckedChange(!!checked)}
                />
                <Label htmlFor="is_active">Active user account</Label>
            </div>
            <InputError message={error} />
        </div>
    );
} 