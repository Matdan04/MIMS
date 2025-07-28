import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface UserPasswordFieldsProps {
    data: {
        password: string;
        password_confirmation: string;
    };
    errors: {
        password?: string;
        password_confirmation?: string;
    };
    onFieldChange: (field: string, value: string) => void;
    isEditing?: boolean;
}

export function UserPasswordFields({ 
    data, 
    errors, 
    onFieldChange, 
    isEditing = false 
}: UserPasswordFieldsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="password">
                    Password {!isEditing && '*'}
                    {isEditing && <span className="text-sm text-muted-foreground">(leave blank to keep current)</span>}
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => onFieldChange('password', e.target.value)}
                    placeholder="Enter password"
                    required={!isEditing}
                />
                <InputError message={errors.password} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password_confirmation">
                    Confirm Password {!isEditing && '*'}
                </Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => onFieldChange('password_confirmation', e.target.value)}
                    placeholder="Confirm password"
                    required={!isEditing}
                />
                <InputError message={errors.password_confirmation} />
            </div>
        </div>
    );
} 