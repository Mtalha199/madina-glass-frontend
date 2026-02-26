"use client";
import { useState } from "react";
import Button from "../ui/button/Button";
import RichTextEditor from "../form/RichTextEditor";
import { EyeIcon, PencilIcon, ChevronLeftIcon } from "@/icons";

const defaultTermsContent = `<h1>Terms & Conditions</h1>
<p>Last Updated: December 27, 2025</p>
<p>These Terms & Conditions ("Terms") govern your access to and use of the BFZ Track platform, including our website, administrative dashboard, and related vehicle tracking services ("Platform"). By accessing or using BFZ Track, you agree to be bound by these Terms. If you do not agree, please do not use the Platform.</p>

<h2>1. About BFZ Track</h2>
<p>BFZ Track is a vehicle tracking and fleet management administrative platform designed to help organizations monitor, manage, and track vehicles and fleets. The Platform provides administrative tools for user management, team coordination, role-based access control, and real-time vehicle tracking capabilities.</p>

<h2>2. Eligibility</h2>
<p>To use BFZ Track, you must:</p>
<ul>
  <li>Be at least 18 years old or have appropriate organizational authorization</li>
  <li>Have the legal capacity to enter into a binding agreement</li>
  <li>Provide accurate and complete information when creating your account</li>
  <li>Maintain the security of your account credentials</li>
  <li>Have authorization from your organization to access fleet tracking data</li>
</ul>

<h2>3. User Accounts and Access</h2>
<p>You are responsible for maintaining the confidentiality of your account information and password. You agree to notify us immediately of any unauthorized use of your account. Access to the Platform is granted based on your organizational role and permissions. You must not share your account credentials with unauthorized individuals.</p>

<h2>4. Vehicle Tracking Data</h2>
<p>By using BFZ Track, you acknowledge that the Platform collects and processes vehicle location data, tracking information, and related fleet management data. You are responsible for ensuring you have proper authorization and legal basis to track vehicles and collect such data in your jurisdiction. You must comply with all applicable privacy laws and regulations regarding location tracking.</p>

<h2>5. Prohibited Activities</h2>
<p>You agree not to:</p>
<ul>
  <li>Violate any applicable laws or regulations, including privacy and data protection laws</li>
  <li>Use the Platform to track vehicles without proper authorization</li>
  <li>Infringe on the rights of others, including privacy rights</li>
  <li>Attempt to gain unauthorized access to the Platform or other users' data</li>
  <li>Interfere with or disrupt the Platform's operation or security</li>
  <li>Use the Platform for any illegal or unauthorized purpose</li>
  <li>Share, sell, or distribute tracking data to unauthorized third parties</li>
</ul>

<h2>6. Data Security and Privacy</h2>
<p>We take data security seriously. However, you are responsible for implementing appropriate security measures for your account and ensuring compliance with applicable data protection regulations. You must not use the Platform in a manner that violates the privacy rights of vehicle drivers or other individuals.</p>

<h2>7. Termination</h2>
<p>We reserve the right to suspend or terminate your account at any time for violations of these Terms, unauthorized access, or any activity that we determine poses a risk to the Platform or other users. Upon termination, your access to the Platform and any stored data may be revoked.</p>

<h2>8. Limitation of Liability</h2>
<p>To the maximum extent permitted by law, BFZ Track shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Platform, including but not limited to loss of data, business interruption, or issues related to vehicle tracking accuracy. The Platform is provided "as is" without warranties of any kind.</p>

<h2>9. Changes to Terms</h2>
<p>We may modify these Terms at any time. We will notify users of material changes through the Platform or other reasonable means. Continued use of the Platform after changes constitutes acceptance of the modified Terms.</p>

<h2>10. Contact Information</h2>
<p>If you have questions about these Terms, please contact us through the Platform's support channels or your designated account representative.</p>`;

export default function TermsAndConditionsContent() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(defaultTermsContent);
  const [version, setVersion] = useState(2);
  const [lastUpdated, setLastUpdated] = useState("1/12/2026");

  const handleSave = () => {
    // Here you would typically save to an API
    setVersion((prev) => prev + 1);
    setLastUpdated(new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }));
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Optionally reset to saved content
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        {/* Back to Settings Link */}
        <div className="mb-6">
          <a
            href="/admin/profile/settings"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to Settings
          </a>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-light-100 dark:bg-blue-light-900/20">
              <svg
                className="w-6 h-6 text-blue-light-600 dark:text-blue-light-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90 mb-2">
                Terms and Conditions
              </h1>
              <nav>
                <ol className="flex items-center gap-1.5">
                  <li>
                    <a
                      href="/admin/profile/settings"
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Settings
                      <svg
                        className="stroke-current"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                          stroke=""
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      Terms and Conditions
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        {/* Edit Terms and Conditions Card */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-white/3">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Edit Terms and Conditions
            </h4>
          </div>

          {/* Preview/Edit Toggle Buttons */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              size="sm"
              variant={!isEditMode ? "primary" : "outline"}
              startIcon={<EyeIcon className="w-5 h-5" />}
              onClick={() => setIsEditMode(false)}
            >
              Preview
            </Button>
            <Button
              size="sm"
              variant={isEditMode ? "primary" : "outline"}
              startIcon={<PencilIcon className="w-5 h-5" />}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
          </div>

          {/* Content Area */}
          {isEditMode ? (
            <div>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Enter terms and conditions content..."
                minHeight="400px"
                maxHeight="800px"
              />
              <div className="flex items-center gap-3 mt-6">
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              <style dangerouslySetInnerHTML={{
                __html: `
                  .terms-and-conditions-content {
                    color: #475467;
                    line-height: 1.6;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                  }
                  .terms-and-conditions-content h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1d2939;
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                  }
                  .terms-and-conditions-content h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1d2939;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                  }
                  .terms-and-conditions-content p {
                    margin-bottom: 1rem;
                    color: #475467;
                    line-height: 1.6;
                  }
                  .terms-and-conditions-content ul,
                  .terms-and-conditions-content ol {
                    margin-top: 0.5rem;
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                    color: #475467;
                  }
                  .terms-and-conditions-content li {
                    margin-bottom: 0.5rem;
                    color: #475467;
                    line-height: 1.6;
                  }
                  .terms-and-conditions-content strong,
                  .terms-and-conditions-content b {
                    font-weight: 600;
                    color: #1d2939;
                  }
                  .terms-and-conditions-content em,
                  .terms-and-conditions-content i {
                    font-style: italic;
                  }
                  .terms-and-conditions-content u {
                    text-decoration: underline;
                  }
                  .terms-and-conditions-content a {
                    color: #0ba5ec;
                    text-decoration: underline;
                  }
                  .terms-and-conditions-content a:hover {
                    color: #0086c9;
                  }
                  .dark .terms-and-conditions-content {
                    color: #98a2b3;
                  }
                  .dark .terms-and-conditions-content h1,
                  .dark .terms-and-conditions-content h2,
                  .dark .terms-and-conditions-content strong,
                  .dark .terms-and-conditions-content b {
                    color: rgba(255, 255, 255, 0.9);
                  }
                  .dark .terms-and-conditions-content p,
                  .dark .terms-and-conditions-content ul,
                  .dark .terms-and-conditions-content ol,
                  .dark .terms-and-conditions-content li {
                    color: #98a2b3;
                  }
                  .dark .terms-and-conditions-content a {
                    color: #36bffa;
                  }
                  .dark .terms-and-conditions-content a:hover {
                    color: #7cd4fd;
                  }
                `
              }} />
              <div
                style={{
                  minHeight: "400px",
                  padding: "1.5rem",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <div
                  className="terms-and-conditions-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

