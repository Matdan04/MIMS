// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg py-3 px-4">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button 
                    disabled={processing} 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 border-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Resend verification email
                </Button>

                <div className="pt-2">
                    <TextLink 
                        href={route('logout')} 
                        method="post" 
                        className="text-sm text-slate-600 hover:text-blue-600 transition-colors font-medium"
                    >
                        Log out
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}