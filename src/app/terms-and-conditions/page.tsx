import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | BFZ Track",
  description: "Terms and conditions for using BFZ Track services",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Welcome to BFZ Track. These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our 
              vehicle tracking and port clearance services. By accessing or using our services, you agree to be 
              bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              By accessing or using BFZ Track services, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms and all applicable laws and regulations. If you are entering into these 
              Terms on behalf of a company or other legal entity, you represent that you have the authority to bind 
              such entity to these Terms.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. Services Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              BFZ Track provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Real-time vehicle tracking solutions</li>
              <li>Automated port clearance services</li>
              <li>Logistics management and monitoring tools</li>
              <li>Related support and consulting services</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of our services at any time 
              without prior notice.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. User Accounts
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              To access certain features of our services, you may be required to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Acceptable Use
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Interfere with or disrupt the services or servers connected to the services</li>
              <li>Attempt to gain unauthorized access to any portion of the services</li>
              <li>Transmit any viruses, malware, or other harmful code</li>
              <li>Reverse engineer, decompile, or disassemble any part of our services</li>
              <li>Use automated systems to access the services without authorization</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              All content, features, and functionality of our services, including but not limited to text, graphics, 
              logos, icons, images, and software, are the exclusive property of BFZ Track and its licensors. These 
              materials are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise 
              use any content from our services without our prior written consent.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Payment Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              If you purchase any paid services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>You agree to pay all fees associated with your subscription or purchase</li>
              <li>Fees are non-refundable unless otherwise stated or required by law</li>
              <li>We reserve the right to change our pricing with reasonable notice</li>
              <li>Failure to pay may result in suspension or termination of your account</li>
              <li>All fees are exclusive of applicable taxes, which you are responsible for paying</li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy 
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>BFZ Track shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Our total liability for any claims arising from your use of the services shall not exceed the amount 
              you paid to us in the twelve (12) months preceding the claim</li>
              <li>We do not guarantee that the services will be uninterrupted, secure, or error-free</li>
              <li>We are not responsible for any loss or damage resulting from your reliance on information provided through our services</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              You agree to indemnify, defend, and hold harmless BFZ Track, its officers, directors, employees, and 
              agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from 
              your use of the services, violation of these Terms, or infringement of any rights of another party.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We may terminate or suspend your account and access to the services immediately, without prior notice, 
              for any reason, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Breach of these Terms</li>
              <li>Fraudulent, abusive, or illegal activity</li>
              <li>Non-payment of fees</li>
              <li>Request by law enforcement or government agencies</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
              Upon termination, your right to use the services will immediately cease, and we may delete your account 
              and data.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              12. Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              We reserve the right to modify these Terms at any time. We will notify you of any material changes by 
              posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the 
              services after such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              BFZ Track operates, without regard to its conflict of law provisions. Any disputes arising from these 
              Terms or your use of the services shall be subject to the exclusive jurisdiction of the courts in that 
              jurisdiction.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              14. Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              If you have any questions about these Terms and Conditions, please contact us through our 
              <a href="/contact" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline ml-1">
                contact page
              </a>.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              15. Severability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited 
              or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force 
              and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              16. Entire Agreement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and BFZ Track 
              regarding your use of the services and supersede all prior agreements and understandings.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By using BFZ Track services, you acknowledge that you have read and understood these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

