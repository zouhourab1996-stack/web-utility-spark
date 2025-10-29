import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const PrivacyPolicy = () => {
  const seoConfig = seoConfigs["/privacy-policy"];

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Smart Tools Hub operates as a client-side web application. We do not collect, store, or transmit personal information to any servers. All calculations and data processing happen locally in your browser.
            </p>
            <p>
              <strong>Data We Don't Collect:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information</li>
              <li>Email addresses or contact details</li>
              <li>Financial information or payment details</li>
              <li>Browsing history or usage patterns</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Analytics and Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              We use Google Analytics to understand how visitors use our website. This service may collect anonymous information such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Page views and session duration</li>
              <li>Geographic location (country/city level)</li>
            </ul>
            <p>
              You can opt out of Google Analytics by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Some tools may use external APIs for functionality (e.g., currency conversion rates). These services may collect minimal data as described in their own privacy policies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Currency exchange rate providers</li>
              <li>Google Fonts for typography</li>
              <li>CDN services for faster content delivery</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Advertising</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              We may display advertisements through Google AdSense. These ads may use cookies to provide relevant advertisements based on your browsing behavior. You can manage ad preferences through your{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Since all data processing happens locally in your browser and we don't store any personal information on servers, your privacy is inherently protected. Any data you input into our tools remains on your device.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Our services are available to all users. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-semibold">anistouati74@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PrivacyPolicy;
