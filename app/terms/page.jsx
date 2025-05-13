import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white animate-slideInRight">
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

      {/* Header */}
      <section className="px-6 md:px-16 py-20 text-center animate-slideInRight1">
        <h1 className="text-4xl md:text-5xl p-4 font-bold bg-gradient-to-r from-white via-green-400 to-teal-500 bg-clip-text text-transparent mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Please read these terms carefully before using AIQuestify. By accessing or using our services, you agree to be bound by these terms.
        </p>
      </section>

      {/* Terms Content */}
      <section className="px-6 md:px-16 pb-20 max-w-4xl mx-auto space-y-10 text-gray-300">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight2">
          <h2 className="text-2xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By using AIQuestify, you agree to these Terms of Service. If you do not agree, you may not use our platform or services.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight3">
          <h2 className="text-2xl font-semibold text-white mb-2">2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and ensuring that all activities under your account comply with these terms and all applicable laws.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight4">
          <h2 className="text-2xl font-semibold text-white mb-2">3. Service Usage</h2>
          <p>
            AIQuestify provides AI-powered hiring tools. You agree not to misuse the service, interfere with its operation, or access it using automated means without permission.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight5">
          <h2 className="text-2xl font-semibold text-white mb-2">4. Intellectual Property</h2>
          <p>
            All content, branding, and code on AIQuestify are protected by intellectual property laws. You may not copy, distribute, or reverse-engineer our platform.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight6">
          <h2 className="text-2xl font-semibold text-white mb-2">5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the platform at our discretion if you violate these terms or misuse the service.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-fadeUp">
          <h2 className="text-2xl font-semibold text-white mb-2">6. Changes to Terms</h2>
          <p>
            We may update these terms occasionally. Continued use of the platform after changes means you accept the updated terms.
          </p>
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
