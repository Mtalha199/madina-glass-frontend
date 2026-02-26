import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BFZ Track",
  description: "Privacy policy for BFZ Track services",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
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
              Welcome to BFZ Track. We are committed to protecting your privacy and ensuring the security of your 
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you use our vehicle tracking and port clearance services. Please read this Privacy Policy 
              carefully. By using our services, you agree to the collection and use of information in accordance with 
              this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We collect information that you provide directly to us and information that is automatically collected 
              when you use our services:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.1 Personal Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              When you create an account or use our services, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Name, email address, phone number, and contact information</li>
              <li>Company name and business information</li>
              <li>Payment and billing information</li>
              <li>Vehicle registration and identification details</li>
              <li>Port clearance documents and related information</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              When you access our services, we automatically collect:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Location data (for vehicle tracking services)</li>
              <li>Log files and analytics data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Delivering vehicle tracking and port clearance services</li>
              <li>Sending you service-related communications and updates</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Detecting, preventing, and addressing technical issues and security threats</li>
              <li>Complying with legal obligations and enforcing our terms</li>
              <li>Analyzing usage patterns to enhance user experience</li>
              <li>Sending marketing communications (with your consent)</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We do not sell your personal information. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf 
              (payment processing, data storage, analytics)</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our 
              business</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our 
              users or others</li>
              <li><strong>With Your Consent:</strong> When you have explicitly authorized us to share your information</li>
              <li><strong>Port Authorities:</strong> As necessary for port clearance and customs processing</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure data storage and backup systems</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive 
              to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Your Rights and Choices
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your personal information</li>
              <li><strong>Restriction:</strong> Request restriction of processing your information</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
              To exercise these rights, please contact us through our 
              <a href="/contact" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline ml-1">
                contact page
              </a>. We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              We use cookies and similar tracking technologies to collect and store information about your preferences 
              and activities. Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Remember your login credentials and preferences</li>
              <li>Analyze how you use our services</li>
              <li>Improve functionality and user experience</li>
              <li>Provide personalized content and advertisements</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mt-4">
              You can control cookies through your browser settings. However, disabling cookies may limit your ability 
              to use certain features of our services.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              8. Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              Our services may contain links to third-party websites or integrate with third-party services. We are not 
              responsible for the privacy practices of these third parties. We encourage you to review the privacy policies 
              of any third-party services you access through our platform.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Third-party services we may use include payment processors, analytics providers, cloud storage services, 
              and communication tools. These services have their own privacy policies governing the collection and use 
              of your information.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              9. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need 
              your information, we will securely delete or anonymize it. Some information may be retained for legal, 
              accounting, or regulatory compliance purposes.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children. If we become aware that we have collected information from a child without 
              parental consent, we will take steps to delete that information promptly. If you believe we have collected 
              information from a child, please contact us immediately.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              11. International Data Transfers
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws that differ from those in your country. By using our services, 
              you consent to the transfer of your information to these countries. We take appropriate measures to ensure 
              that your information receives an adequate level of protection in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
              operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new 
              Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy 
              Policy periodically. Your continued use of our services after any changes constitutes your acceptance of 
              the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              13. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us through our 
              <a href="/contact" className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 underline ml-1">
                contact page
              </a>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              We are committed to addressing your privacy concerns and will respond to your inquiries in a timely manner.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By using BFZ Track services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

