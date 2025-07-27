import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';

export default function HeroSection() {
    const { auth } = usePage<SharedData>().props;

    return (
        <div 
            className="w-full relative min-h-screen flex flex-col"
            style={{
                backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.75), rgba(59, 130, 246, 0.75)), url('${window.location.origin}/images/IMU.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Header */}
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-7xl mx-auto relative z-10 pt-6 lg:pt-8 px-6 lg:px-8">
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Button asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-300">
                            <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button asChild variant="ghost" className="text-white hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                                <Link href={route('login')}>
                                    Log in
                                </Link>
                            </Button>
                            <Button asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-300">
                                <Link href={route('register')}>
                                    Register
                                </Link>
                            </Button>
                        </>
                    )}
                </nav>
            </header>

            {/* Hero Content */}
            <div className="flex-1 flex items-center justify-center px-6 lg:px-8">
                <div className="text-center max-w-6xl">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
                        IMU Matching Information Management System
                    </h1>
                    <p className="text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed drop-shadow-lg max-w-4xl mx-auto">
                        Streamlining student-partner school matching for Medical, Dental, and Veterinary programs through modern technology and data-driven processes.
                    </p>
                </div>
            </div>
        </div>
    );
}