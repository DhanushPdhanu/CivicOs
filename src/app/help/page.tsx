import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { HelpCircle, Mail, BookOpen } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      q: 'How do I submit a new civic report?',
      a: 'Log in as a Citizen, navigate to your Dashboard, and click the "Submit Report" button. Fill in the details, attach any relevant images, and our AI will automatically categorize it.'
    },
    {
      q: 'What happens after I submit a report?',
      a: 'Your report is analyzed by our AI to assess severity and category. It is then mapped and sent to the Government dashboard where officials can review it, prioritize it, and assign resources.'
    },
    {
      q: 'How does the AI Policy Copilot work?',
      a: 'The Policy Copilot acts as an assistant for government officials. It analyzes aggregate report data and suggests evidence-based policy drafts or interventions based on successful historical precedents.'
    },
    {
      q: 'Is my personal data secure?',
      a: 'Yes. CivicOS anonymizes individual report data when aggregating it for public dashboards or AI analysis. Only authorized officials can see specific reporter details when necessary for follow-up.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Help & Support</h1>
          <p className="text-xl text-slate-600">
            Find answers, guides, and demo information for CivicOS.
          </p>
        </div>

        {/* Demo Credentials */}
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
              <BookOpen className="text-primary-600" /> Demo Accounts
            </h2>
          </CardHeader>
          <CardContent className="text-primary-800 space-y-2">
            <p className="mb-4">Use the following credentials to explore different roles in the platform:</p>
            <ul className="list-disc pl-5 space-y-1 font-mono text-sm">
              <li><strong>Citizen:</strong> citizen@demo.com / demo123</li>
              <li><strong>Government:</strong> gov@demo.com / demo123</li>
              <li><strong>Admin:</strong> admin@demo.com / demo123</li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="text-primary-600" /> Frequently Asked Questions
            </h2>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="text-primary-600" /> Contact Support
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Still have questions? Our support team is here to help you get the most out of CivicOS.
            </p>
            <p className="text-sm font-medium text-slate-800 bg-slate-100 p-3 rounded inline-block">
              support@civicos-demo.org
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
