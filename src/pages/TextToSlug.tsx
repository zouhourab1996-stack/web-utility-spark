import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Type, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const TextToSlug = () => {
  const [input, setInput] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const { toast } = useToast();
  const seoConfig = seoConfigs["/text-to-slug"];

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const generateFilename = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const handleGenerate = () => {
    if (!input) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    setSlug(generateSlug(input));
    setFilename(generateFilename(input));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Type className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Text-To-Slug / Filename Sanitizer</h1>
          <p className="text-lg text-muted-foreground">
            Convert text to URL-friendly slugs and safe filenames
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Text</CardTitle>
            <CardDescription>Type or paste any text to convert</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Input Text</Label>
              <Input
                placeholder="My Blog Post Title!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>
            <Button onClick={handleGenerate} className="w-full">
              Generate
            </Button>
          </CardContent>
        </Card>

        {slug && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>URL Slug</CardTitle>
                  <Button
                    onClick={() => copyToClipboard(slug, "Slug")}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <CardDescription>Use this for URLs and permalinks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 rounded-lg font-mono break-all">
                  {slug}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Example: https://example.com/{slug}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filename</CardTitle>
                  <Button
                    onClick={() => copyToClipboard(filename, "Filename")}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <CardDescription>Use this for file names</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 rounded-lg font-mono break-all">
                  {filename}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Example: {filename}.txt
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <strong>URL Slug:</strong> Uses hyphens (-), removes special characters, perfect for URLs</p>
            <p>• <strong>Filename:</strong> Uses underscores (_), removes special characters, safe for all systems</p>
            <p>• Both are lowercase and trim whitespace automatically</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TextToSlug;
