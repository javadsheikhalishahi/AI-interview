import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white animate-fadeUp">
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
      <section className="px-6 md:px-16 py-20 text-center animate-slideInRight">
        <h1 className="text-4xl md:text-5xl p-4 font-bold bg-gradient-to-r from-white via-purple-400 to-indigo-500 bg-clip-text text-transparent mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Your privacy is important to us. This policy outlines how AIQuestify collects, uses, and protects your information.
        </p>
      </section>

      {/* Policy Content */}
      <section className="px-6 md:px-16 pb-20 max-w-4xl mx-auto space-y-10 text-gray-300 animate-slideInRight1">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight2">
          <h2 className="text-2xl font-semibold text-white mb-2">1. Information We Collect</h2>
          <p>
            We collect personal information such as name, email, and interview responses. This helps us deliver personalized, AI-enhanced hiring experiences.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight3">
          <h2 className="text-2xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
          <p>
            Your data is used for interview generation, candidate analysis, and platform optimization. We never sell or rent your information to third parties.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight4">
          <h2 className="text-2xl font-semibold text-white mb-2">3. Data Security</h2>
          <p>
            We use industry-standard encryption, secure servers, and privacy-first architecture to ensure your information stays safe.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight5">
          <h2 className="text-2xl font-semibold text-white mb-2">4. Your Rights</h2>
          <p>
            You have full control over your data. You can request access, correction, or deletion of your information anytime.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 animate-slideInRight6">
          <h2 className="text-2xl font-semibold text-white mb-2">5. Updates to This Policy</h2>
          <p>
            We may update this policy to reflect changes in our practices or services. We’ll notify you of significant updates via email or the platform.
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
