import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Database, TrendingUp, FileText, Star, Users } from 'lucide-react';

const benefits = [
    {
        icon: Zap,
        title: "Efficiency & Time-Saving",
        description: "Automated submission and ranking processes reduce manual handling and significantly decrease the time needed to manage matching exercises."
    },
    {
        icon: Database,
        title: "Centralized Information",
        description: "All student applications, documents, and partner school rankings are consolidated in one platform, creating a single source of truth."
    },
    {
        icon: TrendingUp,
        title: "Scalability",
        description: "Handle larger numbers of students and partner schools compared to manual processes, enabling growth as programs expand."
    },
    {
        icon: FileText,
        title: "Audit Trail & Reporting",
        description: "Detailed tracking of submissions and rankings with comprehensive reporting on matching outcomes and trends for informed decision-making."
    },
    {
        icon: Star,
        title: "Enhanced Reputation",
        description: "Demonstrates commitment to modern technology and process improvement, strengthening the university's reputation as a forward-thinking institution."
    },
    {
        icon: Users,
        title: "Better Collaboration",
        description: "Fosters smoother collaboration with partner schools through structured and standardized ranking and communication methods."
    }
];

export default function BenefitsSection() {
    return (
        <section className="mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-700">
                    Why MIMS 2.0?
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Our modernized matching system delivers enhanced efficiency, transparency, and user experience for all stakeholders.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-blue-100 hover:border-blue-200 bg-white">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <benefit.icon className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-xl text-blue-700">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-slate-600">
                                {benefit.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}