import { useState } from "react";
import { FileText, HelpCircle, Mail, MessageSquare, SendHorizontal, ShieldCheck, Info, Scale } from "lucide-react";
import {
  classNames,
  ThemedButton,
  ThemedCard,
  ThemedCardHead,
  ThemedCardParagraph,
  ThemedInput,
  ThemedPage,
} from "../../components/Theme";

const tosHtml = (
  <div className="space-y-4">
    <p className="text-sm font-semibold text-theme-primary">Last Updated: June 2026</p>
    <p className="text-sm leading-6 text-theme-text-secondary">
      Welcome to FlashMind. These Terms of Service ("Terms") govern your access to and use of the FlashMind platform, website, applications, and services (collectively, the "Service"). By creating an account or using FlashMind, you agree to be bound by these Terms.
    </p>

    <div className="space-y-3">
      <div>
        <h3 className="text-base font-bold text-theme-text-primary">1. Eligibility</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          You must be at least 13 years old, or the minimum age required in your country, to use FlashMind.
        If you are under the age of majority, you must have permission from a parent or legal guardian.</p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">2. User Accounts</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">You are responsible for:</p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Maintaining the security of your account.</li>
          <li>Keeping your login credentials confidential.</li>
          <li>All activities that occur under your account.</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          You agree to provide accurate information when creating an account.
          We reserve the right to suspend or terminate accounts that violate these Terms.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">3. Educational Purpose</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind is designed as a learning and study tool.
          While we strive to provide accurate information, FlashMind does not guarantee:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Educational outcomes</li>
          <li>Exam results</li>
          <li>Academic performance</li>
          <li>Accuracy of AI-generated content</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Users should independently verify important information.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">4. User Content</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          You retain ownership of the content you create, upload, or submit through FlashMind, including:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Flashcards</li>
          <li>Notes</li>
          <li>PDFs</li>
          <li>Study materials</li>
          <li>Messages</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          By uploading content, you grant FlashMind a limited license to process, store, and display that content solely for providing the Service.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">5. AI-Generated Content</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind uses artificial intelligence to generate flashcards, quizzes, explanations, and study materials.
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          AI-generated content:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>May contain errors</li>
          <li>May be incomplete</li>
          <li>Should be reviewed before academic use</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind is not responsible for inaccuracies in AI-generated content.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">6. PDF Uploads and File Processing</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          When you upload files:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>You confirm you have the right to upload the content.</li>
          <li>You grant FlashMind permission to process the file for study material generation.</li>
          <li>Uploaded files may be temporarily stored to provide platform functionality.</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          You must not upload:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Illegal content</li>
          <li>Malicious software</li>
          <li>Copyright-infringing material</li>
          <li>Content that violates third-party rights</li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">7. Acceptable Use</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          You agree not to:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Use the Service for unlawful purposes.</li>
          <li>Attempt to gain unauthorized access to systems.</li>
          <li>Upload malware, viruses, or harmful code.</li>
          <li>Reverse engineer the platform.</li>
          <li>Abuse AI systems.</li>
          <li>Disrupt platform operations.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">8. Intellectual Property</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind, including its design, branding, software, and features, is owned by FlashMind and protected by applicable intellectual property laws.
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          These Terms do not transfer ownership of FlashMind intellectual property to users.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">9. Privacy</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Your use of FlashMind is also governed by our Privacy Policy.
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          By using the Service, you acknowledge that information may be collected and processed as described in the Privacy Policy.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">10. Service Availability</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          We strive to provide reliable service but do not guarantee uninterrupted availability.
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind may:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Modify features</li>
          <li>Update functionality</li>
          <li>Perform maintenance</li>
          <li>Temporarily suspend access</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          without prior notice.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">11. Third-Party Services</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          FlashMind may use third-party services including:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Firebase</li>
          <li>Cloudinary</li>
          <li>AI providers</li>
          <li>Analytics providers</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Your use of FlashMind may also be subject to the terms and policies of those providers.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">12. Termination</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          We may suspend or terminate access if:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>These Terms are violated.</li>
          <li>Fraudulent activity is detected.</li>
          <li>Security concerns arise.</li>
          <li>Required by law.</li>
        </ul>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Users may stop using the Service at any time.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">13. Disclaimer of Warranties</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          The Service is provided "as is" and "as available." To the maximum extent permitted by law, FlashMind disclaims all warranties, including:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Accuracy</li>
          <li>Reliability</li>
          <li>Availability</li>
          <li>Fitness for a particular purpose</li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">14. Limitation of Liability</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          To the maximum extent permitted by law, FlashMind shall not be liable for:
        </p>
        <ul className="ml-5 list-disc space-y-1 text-sm leading-6 text-theme-text-secondary ml-16">
          <li>Loss of data</li>
          <li>Academic outcomes</li>
          <li>Indirect damages</li>
          <li>Consequential damages</li>
          <li>Lost profits</li>
        </ul>
       
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">15. Changes to Terms</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          We may update these Terms periodically.
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Continued use of FlashMind after updates constitutes acceptance of the revised Terms.
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">16. Contact Information</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          For questions regarding these Terms, contact:
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Email: [Your Email Address]
        </p>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          Website: [Your Website]
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-theme-text-primary">17. Governing Law</h3>
        <p className="text-sm leading-6 text-theme-text-secondary ml-8">
          These Terms shall be governed by and interpreted in accordance with the laws applicable in your jurisdiction unless otherwise required by local law.
        </p>
      </div>
    </div>
  </div>
);

export default function HelpCenter() {
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState("inquiry");

  return (
    <ThemedPage className="space-y-6 mx-auto max-w-5xl p-4">
      <section>
        <h1 className="mt-2 text-3xl font-black text-theme-text-primary sm:text-4xl">Help Center</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-theme-text-secondary">
          Review terms of service and send a support inquiry through a static interface.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("inquiry")}
            className={classNames(
              "flex w-fit items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-semibold transition",
              activeTab === "inquiry"
                ? "border-theme-primary bg-theme-primary text-white"
                : "border-theme-border bg-theme-surface text-theme-text-secondary hover:border-theme-primary cursor-pointer"
            )}
          >
            <Info className="h-4 w-4" />
            Inquiry
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tos")}
            className={classNames(
              "flex w-fit items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-semibold transition",
              activeTab === "tos"
                ? "border-theme-primary bg-theme-primary text-white"
                : "border-theme-border bg-theme-surface text-theme-text-secondary hover:border-theme-primary cursor-pointer"
            )}
          >
            <Scale className="h-4 w-4" />
            Terms of Service
          </button>
        </div>

        {activeTab === "inquiry" ? (
          <ThemedCard
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="space-y-4 p-5"
          >
            <div className="flex items-start gap-3">
              
              <div>
                <ThemedCardHead as="h2">Inquiry</ThemedCardHead>
                <ThemedCardParagraph>Static support request form.</ThemedCardParagraph>
              </div>
            </div>

            {sent && (
              <div className="rounded-lg border border-theme-success/30 bg-theme-success/10 px-4 py-3 text-sm font-bold text-theme-success">
                Inquiry preview submitted. This static form is not connected to a backend yet.
              </div>
            )}

            <ThemedInput label="Name" placeholder="Your name" />
            <ThemedInput label="Email" type="email" placeholder="you@example.com" />
            <label className="block">
              <span className="text-sm font-bold text-theme-text-primary">Topic</span>
              <select className="mt-2 w-full rounded-xl border border-theme-border bg-theme-surface px-4 py-3 text-theme-text-primary outline-none focus:border-theme-primary">
                <option>Account access</option>
                <option>Deck generation</option>
                <option>Study mode issue</option>
                <option>Billing or subscription</option>
                <option>Other</option>
              </select>
            </label>
            <ThemedInput label="Message" textarea rows={4} placeholder="Describe your concern..." />

            <div className="grid gap-3 rounded-lg border border-theme-border bg-theme-surface-muted p-4 text-sm text-theme-text-secondary">
              <p className="flex items-center gap-2 font-bold">
                <Mail className="h-4 w-4 text-theme-primary" />
                Response window: 1-2 business days
              </p>
              <p className="flex items-center gap-2 font-bold">
                <MessageSquare className="h-4 w-4 text-theme-primary" />
                Include deck names or screenshots when useful
              </p>
            </div>

            <div className="flex justify-end">
                  <ThemedButton type="submit" className="w-fit gap-2">
              <SendHorizontal className="h-4 w-4" />
              Submit inquiry
            </ThemedButton>
            </div>

          </ThemedCard>
        ) : (
          <ThemedCard className="space-y-5 p-4 sm:p-8">
            <div className="flex items-start gap-3">
              
              <div>
                <ThemedCardHead as="h2">Terms of Service</ThemedCardHead>
                <ThemedCardParagraph>Static overview for FlashMind users.</ThemedCardParagraph>
              </div>
            </div>

            {tosHtml}

            <div className="rounded-lg border border-theme-border bg-theme-surface-muted p-4">
              <p className="flex items-center gap-2 text-sm font-black text-theme-text-primary">
                <ShieldCheck className="h-4 w-4 text-theme-primary" />
                Privacy note
              </p>
              <p className="mt-2 text-sm leading-6 text-theme-text-secondary">
                This page is a static UI. Connect it to Firestore or an email service when you want to store and process real inquiries.
              </p>
            </div>
          </ThemedCard>
        )}
      </section>
    </ThemedPage>
  );
}
