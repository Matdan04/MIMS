import { Card } from '@/components/ui/card';

const metrics = [
    { value: "90%", label: "Increased Student Satisfaction" },
    { value: "75%", label: "Reduced Processing Time" },
    { value: "100%", label: "Digital Process" },
    { value: "3", label: "Programs Supported" }
];

export default function ImpactMetricsSection() {
    return (
        <section className="mb-24">
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-700">
                        University Impact
                    </h2>
                    <p className="text-xl text-slate-600">
                        Transforming education through technology
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl lg:text-6xl font-bold text-blue-600 mb-2">
                                {metric.value}
                            </div>
                            <p className="text-lg text-slate-600">
                                {metric.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
}