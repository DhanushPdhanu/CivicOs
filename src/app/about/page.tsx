import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Target, Users, Zap, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">About CivicOS</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Building the operating system for modern civic engagement and data-driven governance.
          </p>
        </div>

        {/* Mission */}
        <section>
          <Card className="border-t-4 border-t-primary-600 shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Target className="text-primary-600" /> Our Mission
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our mission is to bridge the gap between citizen needs and government action. We believe that by leveraging cutting-edge artificial intelligence, we can transform raw civic feedback into structured, actionable intelligence that empowers cities to be more responsive, equitable, and resilient.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* What is CivicOS */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is CivicOS?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">For Citizens</h3>
                <p className="text-slate-600">
                  A frictionless platform to report issues, suggest improvements, and track the impact of their voices within their communities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">For Governments</h3>
                <p className="text-slate-600">
                  A comprehensive command center that automatically triages reports, predicts emerging issues, and suggests evidence-backed policies.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology */}
        <section>
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Zap className="text-primary-600" /> Technology
              </h2>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600">
              <p>
                CivicOS is powered by a modern stack designed for scale and intelligence:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Next.js & React:</strong> Delivering a fast, responsive, mobile-first experience.</li>
                <li><strong>NLP Classifiers:</strong> Automatically parsing and categorizing unstructured text from citizen reports.</li>
                <li><strong>Predictive Analytics:</strong> Geospatial analysis identifying hot-spots and predicting infrastructure risks.</li>
                <li><strong>Policy Copilot:</strong> LLM-driven assistant that retrieves successful historical precedents to draft actionable policy briefs.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Team Placeholder */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Team</h2>
          <p className="text-slate-600">
            Built with ❤️ by a passionate group of developers, data scientists, and civic tech enthusiasts during the H2S Hackathon.
          </p>
        </section>

      </div>
    </div>
  );
}
