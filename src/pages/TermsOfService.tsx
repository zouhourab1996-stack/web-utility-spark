import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const TermsOfService = () => {
  const seoConfig = seoConfigs["/terms-of-service"];

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              By accessing and using Smart Tools Hub, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use our website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Use License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Permission is granted to temporarily access and use the tools on Smart Tools Hub for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for commercial purposes</li>
              <li>Attempting to decompile or reverse engineer any software on the website</li>
              <li>Removing copyright or proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on another server</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              The tools and calculators on Smart Tools Hub are provided "as is." We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accuracy or reliability of results</li>
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property rights</li>
            </ul>
            <p className="font-semibold mt-4">
              Important: Results from financial calculators should not be considered professional financial advice. Always consult with qualified professionals for important financial decisions.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Limitations of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              In no event shall Smart Tools Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data, profit, or business interruption) arising out of the use or inability to use the tools on this website.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Accuracy of Materials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              The tools and information on Smart Tools Hub may include technical, typographical, or calculation errors. We do not guarantee the accuracy, completeness, or currency of any information provided.
            </p>
            <p>
              We reserve the right to make changes to the tools and information at any time without notice.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>6. Links to Third-Party Sites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              Smart Tools Hub may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy practices.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>7. User Conduct</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to interfere with the proper functioning of the website</li>
              <li>Use automated systems to access the website without permission</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>8. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              All content on Smart Tools Hub, including text, graphics, logos, and software, is the property of Smart Tools Hub or its content suppliers and is protected by international copyright laws.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>9. Modifications to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              We reserve the right to revise these Terms of Service at any time without notice. By using this website, you agree to be bound by the current version of these Terms of Service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="font-semibold">anistouati74@gmail.com</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TermsOfService;
