import { Label } from '@/components/ui/label';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { type Role } from '@/types';

interface UserRoleFieldProps {
    value: string;
    roles: Role[];
    error?: string;
    onValueChange: (value: string) => void;
}

export function UserRoleField({ value, roles, error, onValueChange }: UserRoleFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="role_id">Role *</Label>
            <Select
                value={value}
                onValueChange={onValueChange}
                required
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">Select a role</SelectItem>
                    {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                            {role.display_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
} 