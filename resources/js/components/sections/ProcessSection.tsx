import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BarChart3, Shield, CheckCircle } from 'lucide-react';

const processSteps = [
    {
        step: "1",
        title: "Student Registration",
        description: "Students log in and submit their matching documents and preferences online.",
        icon: Target
    },
    {
        step: "2",
        title: "Partner School Ranking",
        description: "Partner schools review and rank student applications based on their criteria.",
        icon: BarChart3
    },
    {
        step: "3",
        title: "Algorithm Matching",
        description: "Our intelligent system processes preferences and generates optimal matches.",
        icon: Shield
    },
    {
        step: "4",
        title: "Results & Placement",
        description: "Students receive their placements and can track their status throughout the process.",
        icon: CheckCircle
    }
];

export default function ProcessSection() {
    return (
        <section className="mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-700">
                    How MIMS Works
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    A streamlined process designed for students, administrators, and partner schools.
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {processSteps.map((item, index) => (
                    <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-blue-100 hover:border-blue-200 bg-white">
                        <CardHeader className="pb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <span className="text-2xl font-bold text-white">{item.step}</span>
                            </div>
                            <CardTitle className="text-xl text-blue-700">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base text-slate-600">
                                {item.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}