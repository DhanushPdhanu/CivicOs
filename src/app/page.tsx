import Link from 'next/link';
import { MessageSquare, BrainCircuit, Map, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 text-center border-b border-primary-50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white -z-10" />
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold mb-8 border border-primary-200">
            Hackathon Prototype - DEMO DATA
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
            Civic Intelligence Platform
            <br />
            <span className="text-primary-600">Built for the Future</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Transforming citizen feedback into actionable civic intelligence. Empowering governments with AI-driven insights, predictive mapping, and policy copilot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg gap-2">
                Get Started as Citizen <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg">
                Government Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How CivicOS Works</h2>
          <p className="text-lg text-slate-600">A seamless pipeline from citizen voice to policy action.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: MessageSquare, title: 'Citizen Voice', desc: 'Citizens report issues in real-time through an intuitive mobile interface.' },
            { icon: BrainCircuit, title: 'AI Intelligence', desc: 'Reports are instantly categorized, verified, and prioritized by AI models.' },
            { icon: Map, title: 'Civic Insights', desc: 'Data is aggregated onto predictive maps highlighting critical civic needs.' },
            { icon: ShieldCheck, title: 'Policy Action', desc: 'AI Copilot recommends evidence-backed policies for rapid response.' },
          ].map((step, idx) => (
            <Card key={idx} className="border-none shadow-sm bg-slate-50 relative overflow-hidden group">
              <CardContent className="pt-8 text-center relative z-10">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-slate-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Capabilities</h2>
            <p className="text-lg text-slate-600">The technology driving the next generation of civic management.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <BrainCircuit className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Automated Triage</h3>
                <p className="text-slate-600">NLP-driven classification and urgency assessment of thousands of daily reports.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Map className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Predictive Heatmaps</h3>
                <p className="text-slate-600">Forecast urban decay and infrastructure risks before they become critical issues.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <BarChart3 className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Policy Copilot</h3>
                <p className="text-slate-600">AI assistant that drafts policy briefs and action plans based on real-world evidence.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Banner */}
      <div className="bg-primary-600 text-white py-4 px-6 text-center text-sm font-medium">
        Note: This is a hackathon prototype. All data presented in the platform is generated for demonstration purposes.
      </div>
    </div>
  );
}
