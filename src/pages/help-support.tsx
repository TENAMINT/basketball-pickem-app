import Head from "next/head";
import FullWidthLayout from "@/src/components/LayoutFullWidth";
import GridLayout from "../components/LayoutGrid";

export default function HelpSupport() {
  return (
    <FullWidthLayout>
      <Head>
        <title>Help and Support | Basketball Pick&apos;em Powered by TENAMINT</title>
      </Head>
      <GridLayout>
        <div className="px-8">
          <h1 className="text-5xl font-bold my-12">
            Help and Customer Support
          </h1>
          <h3 className="text-2xl font-bold my-4">
            Frequently Asked Questions (FAQs)
          </h3>
          <p>
            Q1: How do I create an account?<br/>
            A: Creating an account is simple!
            Just click on the Sign Up button and follow the instructions.
          </p>
          <p>
            Q2: What should I do if I forget my password?
            <br />
            A: Don’t worry! Click on Forgot Password on the login page and
            follow the steps to reset it.
          </p>
          <p>
            Q3: How can I update my personal information?
            <br />
            A: Log in to your account, go to the settings section, and you can
            update your information there.
          </p>
          <h3 className="text-2xl font-bold my-4">Product/Service</h3>
          <p>
            Discover more about what we offer! Our products/services are
            designed to meet your needs. Check out the detailed descriptions,
            user guides, and feature lists for more information.
          </p>
          <h3 className="text-2xl font-bold my-4">Troubleshooting Guides</h3>
          <p>
            Encountering issues? Our troubleshooting guides provide step-by-step
            solutions for common problems. Whether it&apos;s a technical glitch
            or a service query, we&apos;ve got you covered.
          </p>
          <h3 className="text-2xl font-bold my-4">Contact Information</h3>
          <p>
            Need further assistance? Reach out to us! Here&apos;s how you can
            contact us: Email: support@example.com Phone: 123-456-7890 Live
            Chat: Available on our website from 9 AM to 5 PM (Mon-Fri)
          </p>
          <h3 className="text-2xl font-bold my-4">Feedback and Suggestions</h3>
          <p>
            Your feedback is valuable to us! If you have suggestions or
            comments, please let us know through our feedback form or by
            emailing us at feedback@example.com.
          </p>
        </div>
      </GridLayout>
    </FullWidthLayout>
  );
}
