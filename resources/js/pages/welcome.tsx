import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ImpactMetricsSection from '@/components/sections/ImpactMetricsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';

export default function Welcome() {
    return (
        <>
            <Head title="MIMS">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="flex min-h-screen flex-col items-center text-slate-800">
                <HeroSection />

                <main className="w-full bg-slate-50 relative">
                    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
                        {/* <BenefitsSection /> */}
                        <ProcessSection />
                        {/* <ImpactMetricsSection /> */}
                        <FeaturesSection />
                    </div>
                </main>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}