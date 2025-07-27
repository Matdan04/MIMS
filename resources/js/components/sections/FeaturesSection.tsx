import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const features = [
    {
        title: "User-Centric Design",
        description: "Improved UX ensuring intuitive navigation and increased engagement for all users."
    },
    {
        title: "Scalable Architecture",
        description: "Built to easily adapt to new requirements while ensuring long-term manageability."
    },
    {
        title: "Data Governance",
        description: "Strong foundations for consistent, accurate, and secure data management."
    },
    {
        title: "Continuous Improvement",
        description: "Agile development with real-time feedback integration to stay aligned with user needs."
    }
];

const capabilities = [
    { name: "Data Processing", level: "Advanced" },
    { name: "User Interface", level: "Modern" },
    { name: "Security", level: "Enterprise" },
    { name: "Scalability", level: "On Premise" }
];

export default function FeaturesSection() {
    return (
        <section className="mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-700">
                    MIMS 2.0 Features
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Built with modern architecture and user-centric design principles
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-lg">
                    <CardHeader className="text-center pb-6">
                        <CardTitle className="text-2xl text-blue-700">System Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {capabilities.map((capability, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-slate-700">{capability.name}</span>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{capability.level}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}