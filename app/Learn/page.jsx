import { ArrowLeft, Lightbulb, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LearnMorePage() {
    const comparisonData = [
        { feature: 'Interview Generation', aiValue: 90, traditionalValue: 40 },
        { feature: 'Candidate Screening', aiValue: 85, traditionalValue: 50 },
        { feature: 'Time to Hire', aiValue: 70, traditionalValue: 30 },
        { feature: 'Scalability', aiValue: 95, traditionalValue: 40 },
        { feature: 'Cost Efficiency', aiValue: 80, traditionalValue: 60 },
      ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
      <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-white hover:text-yellow-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20 text-center">
        <h1 className="text-4xl md:text-5xl p-4 font-bold bg-gradient-to-r from-white-400 via-blue-500 to-sky-500 bg-clip-text text-transparent mb-6">
          Discover How AIQuestify Transforms Hiring
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Our intelligent platform automates interviews, analyzes candidate responses in real time, 
          and helps you make faster, smarter hiring decisions—backed by cutting-edge AI.
        </p>
        <Link
          href="/auth"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <FeatureCard
          icon={<Lightbulb className="w-10 h-10 text-yellow-400" />}
          title="Smart Interview Generation"
          desc="Instantly create tailored interview questions using advanced language models. Save hours of prep with AI that understands roles, seniority, and industry-specific needs."
        />
        <FeatureCard
          icon={<Sparkles className="w-10 h-10 text-pink-400" />}
          title="AI-Powered Interviewing"
          desc="Conduct voice-based interviews at scale using our conversational AI. Analyze tone, content, and confidence with real-time scoring and insights—free from human bias."
        />
        <FeatureCard
          icon={<ShieldCheck className="w-10 h-10 text-green-400" />}
          title="Secure & Scalable Infrastructure"
          desc="Built for enterprise reliability with global scalability, encryption at rest and in transit, and compliance-ready protocols—so your data is always protected."
        />
      </section>

      {/* Comparison Section */}
      <section className="px-6 md:px-16 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          AI vs Traditional Hiring: See the Difference
        </h2>

        {/* Custom Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
          {comparisonData.map((item, index) => (
            <div key={index} className="flex items-center mb-4 ">
              <div className="w-1/3 text-gray-300">{item.feature}</div>
              <div className="w-2/3 flex items-center space-x-4">
                <div className="w-full bg-gray-600 h-4 rounded-full">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${item.aiValue}%` }}
                  ></div>
                </div>
                <div className="w-full bg-gray-600 h-4 rounded-full ">
                  <div
                    className="bg-gray-400 h-4 rounded-full "
                    style={{ width: `${item.traditionalValue}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700 shadow-lg">
          <table className="w-full text-left text-sm md:text-base text-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 font-semibold">Feature</th>
                <th className="py-4 px-6 font-semibold text-blue-600">AIQuestify</th>
                <th className="py-4 px-6 font-semibold text-gray-400">Traditional Hiring</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="py-4 px-6">Interview Generation</td>
                <td className="py-4 px-6">Instant, AI-driven & role-specific</td>
                <td className="py-4 px-6">Manual and time-consuming</td>
              </tr>
              <tr>
                <td className="py-4 px-6">Candidate Screening</td>
                <td className="py-4 px-6">Automated voice analysis & scoring</td>
                <td className="py-4 px-6">Subjective and prone to bias</td>
              </tr>
              <tr>
                <td className="py-4 px-6">Time to Hire</td>
                <td className="py-4 px-6">Reduced by 70% on average</td>
                <td className="py-4 px-6">Slower due to manual steps</td>
              </tr>
              <tr>
                <td className="py-4 px-6">Scalability</td>
                <td className="py-4 px-6">Handles hundreds of interviews/day</td>
                <td className="py-4 px-6">Limited by team capacity</td>
              </tr>
              <tr>
                <td className="py-4 px-6">Cost Efficiency</td>
                <td className="py-4 px-6">Lower hiring overhead</td>
                <td className="py-4 px-6">High recruiter cost per hire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-gray-700">
  © {new Date().getFullYear()} AIQuestify. All rights reserved.
  <br />
  Built by{' '}
  <Link
    href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 font-semibold hover:text-indigo-400 transition underline underline-offset-4"
  >
    Javad Sheikhalishahi
  </Link>
</footer>

    </main>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-purple-500 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
