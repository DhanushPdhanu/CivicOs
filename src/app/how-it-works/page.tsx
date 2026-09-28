import { Card, CardContent } from '@/components/ui/Card';
import { MessageSquare, BrainCircuit, Map, AlertTriangle, FileText, CheckCircle, Building } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      icon: MessageSquare,
      title: '1. Citizen Voice',
      description: 'Citizens submit reports on local issues (e.g., potholes, noise complaints, broken streetlights) via a simple, mobile-friendly interface.',
    },
    {
      id: 2,
      icon: BrainCircuit,
      title: '2. AI Analysis',
      description: 'The platform uses Natural Language Processing (NLP) to instantly analyze, categorize, and assign severity scores to incoming reports, filtering out noise.',
    },
    {
      id: 3,
      icon: Map,
      title: '3. Civic Need Map',
      description: 'Categorized reports are aggregated into geospatial heatmaps, allowing government officials to visually pinpoint issue clusters across the city.',
    },
    {
      id: 4,
      icon: AlertTriangle,
      title: '4. Future Risk Prediction',
      description: 'Machine learning models analyze historical data and current trends to forecast potential future risks, shifting governance from reactive to proactive.',
    },
    {
      id: 5,
      icon: FileText,
      title: '5. Policy Recommendation',
      description: 'The AI Policy Copilot drafts targeted policy briefs and intervention plans tailored to the specific needs highlighted by the data.',
    },
    {
      id: 6,
      icon: CheckCircle,
      title: '6. Evidence & Trust',
      description: 'Recommendations are backed by data trails and historical precedent, ensuring decisions are transparent, justifiable, and build public trust.',
    },
    {
      id: 7,
      icon: Building,
      title: '7. Government Decision',
      description: 'Officials review the AI-assisted insights and deploy resources efficiently, closing the loop by notifying citizens when their issues are resolved.',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">How It Works</h1>
          <p className="text-xl text-slate-600">
            The CivicOS Pipeline: From a single voice to city-wide impact.
          </p>
        </div>

        <div className="space-y-8 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-1 bg-primary-100 hidden sm:block z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white border-2 border-primary-200 rounded-full flex items-center justify-center shadow-sm text-primary-600">
                  <step.icon className="w-8 h-8" />
                </div>
              </div>
              <Card className="flex-grow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
