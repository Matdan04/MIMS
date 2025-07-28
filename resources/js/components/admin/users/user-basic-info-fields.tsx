import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface UserBasicInfoFieldsProps {
    data: {
        name: string;
        email: string;
        phone: string;
    };
    errors: {
        name?: string;
        email?: string;
        phone?: string;
    };
    onFieldChange: (field: string, value: string) => void;
}

export function UserBasicInfoFields({ data, errors, onFieldChange }: UserBasicInfoFieldsProps) {
    return (
        <>
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => onFieldChange('name', e.target.value)}
                        placeholder="Enter full name"
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => onFieldChange('email', e.target.value)}
                        placeholder="Enter email address"
                        required
                    />
                    <InputError message={errors.email} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => onFieldChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                />
                <InputError message={errors.phone} />
            </div>
        </>
    );
} 