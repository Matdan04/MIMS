import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-50 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link 
                            href={route('home')} 
                            className="flex flex-col items-center gap-2 font-medium transition-transform hover:scale-105"
                        >
                            <div className="mb-1 flex h-20 w-20 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
                                <AppLogoIcon className="size-16 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                                {title}
                            </h1>
                            <p className="text-center text-sm text-slate-600">
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-blue-100 shadow-lg shadow-blue-500/5 p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}