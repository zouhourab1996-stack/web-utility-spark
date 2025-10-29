import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const PolicyGenerator = () => {
  const [websiteName, setWebsiteName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [generatedPolicy, setGeneratedPolicy] = useState<string>("");
  const { toast } = useToast();
  const seoConfig = seoConfigs["/policy-generator"];

  const generatePolicy = () => {
    if (!websiteName || !contactEmail || !companyName) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const policy = `Privacy Policy for ${websiteName}

Last Updated: ${new Date().toLocaleDateString()}

At ${companyName}, accessible from ${websiteName}, one of our main priorities is the privacy of our visitors.

1. Information We Collect
We collect information you provide directly to us, including name, email address, and any other information you choose to provide.

2. How We Use Your Information
- To provide and maintain our service
- To notify you about changes to our service
- To provide customer support
- To gather analysis or valuable information to improve our service

3. Data Security
We value your trust in providing us your personal information, thus we strive to use commercially acceptable means of protecting it.

4. Contact Us
If you have any questions about this Privacy Policy, please contact us at: ${contactEmail}

---

Terms of Service for ${websiteName}

By accessing ${websiteName}, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.

1. Use License
Permission is granted to temporarily access the materials on ${websiteName} for personal, non-commercial transitory viewing only.

2. Disclaimer
The materials on ${websiteName} are provided on an 'as is' basis. ${companyName} makes no warranties, expressed or implied.

3. Limitations
In no event shall ${companyName} or its suppliers be liable for any damages arising out of the use or inability to use the materials on ${websiteName}.

4. Contact Information
For any questions regarding these Terms of Service, please contact: ${contactEmail}`;

    setGeneratedPolicy(policy);
    toast({
      title: "Success!",
      description: "Privacy Policy and Terms generated",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy);
    toast({
      title: "Copied!",
      description: "Policy text copied to clipboard",
    });
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Micro-FAQ / One-Line Policy Generator</h1>
          <p className="text-lg text-muted-foreground">
            Quickly generate basic Privacy Policy and Terms of Service
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Website Information</CardTitle>
            <CardDescription>Enter your website details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Website Name</Label>
              <Input
                placeholder="example.com"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </div>
            <div>
              <Label>Company Name</Label>
              <Input
                placeholder="Your Company LLC"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <Label>Contact Email</Label>
              <Input
                type="email"
                placeholder="contact@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <Button onClick={generatePolicy} className="w-full">
              Generate Policy
            </Button>
          </CardContent>
        </Card>

        {generatedPolicy && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Policy</CardTitle>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <CardDescription>Review and customize as needed</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedPolicy}
                onChange={(e) => setGeneratedPolicy(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default PolicyGenerator;
