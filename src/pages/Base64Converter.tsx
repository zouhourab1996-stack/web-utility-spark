import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Base64Converter = () => {
  const [textInput, setTextInput] = useState("");
  const [base64Input, setBase64Input] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const { toast } = useToast();

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(textInput)));
      setBase64Output(encoded);
    } catch (error) {
      toast({ title: "Error", description: "Failed to encode text", variant: "destructive" });
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64Input)));
      setTextOutput(decoded);
    } catch (error) {
      toast({ title: "Error", description: "Invalid Base64 string", variant: "destructive" });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64 = result.split(',')[1];
      setBase64Output(base64);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Success", description: "Copied to clipboard!" });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Converter",
    "description": "Convert text and files to Base64 encoding online, free Base64 encoder and decoder",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/base64-converter",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="Base64 Converter — Encode & Decode Base64 Online"
        description="Free Base64 encoder and decoder. Convert text and files to Base64 encoding and decode Base64 strings instantly."
        keywords="base64 converter, base64 encoder, base64 decoder, encode base64, decode base64, file to base64, online tools"
        canonical="/#/base64-converter"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <FileCode className="w-10 h-10 mr-3 text-primary" />
              Base64 Converter
            </h1>
            <p className="text-lg text-muted-foreground">
              Encode and decode Base64 strings and files
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Base64 Encoder & Decoder</CardTitle>
              <CardDescription>Convert between text and Base64 encoding</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="encode" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="encode">Encode</TabsTrigger>
                  <TabsTrigger value="decode">Decode</TabsTrigger>
                </TabsList>

                <TabsContent value="encode" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text to Encode</Label>
                    <Textarea
                      id="text-input"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter text to encode..."
                      rows={6}
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Or Upload File</Label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                  </div>

                  <Button onClick={encodeToBase64} className="w-full gradient-primary text-white">
                    Encode to Base64
                  </Button>

                  {base64Output && (
                    <div className="space-y-2">
                      <Label>Base64 Output</Label>
                      <div className="relative">
                        <Textarea
                          value={base64Output}
                          readOnly
                          rows={6}
                          className="font-mono text-sm"
                        />
                        <Button
                          onClick={() => copyToClipboard(base64Output)}
                          size="sm"
                          className="absolute top-2 right-2"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="decode" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="base64-input">Base64 to Decode</Label>
                    <Textarea
                      id="base64-input"
                      value={base64Input}
                      onChange={(e) => setBase64Input(e.target.value)}
                      placeholder="Enter Base64 string to decode..."
                      rows={6}
                      className="font-mono"
                    />
                  </div>

                  <Button onClick={decodeFromBase64} className="w-full gradient-primary text-white">
                    Decode from Base64
                  </Button>

                  {textOutput && (
                    <div className="space-y-2">
                      <Label>Decoded Text</Label>
                      <div className="relative">
                        <Textarea
                          value={textOutput}
                          readOnly
                          rows={6}
                          className="font-mono"
                        />
                        <Button
                          onClick={() => copyToClipboard(textOutput)}
                          size="sm"
                          className="absolute top-2 right-2"
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About Base64 Encoding</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to encode data that needs to be stored or transferred over media designed to handle text.
              </p>
              <p className="mt-4">
                <strong>Common uses:</strong>
              </p>
              <ul>
                <li>Embedding images in HTML/CSS</li>
                <li>Encoding email attachments</li>
                <li>Data URLs in web applications</li>
                <li>Storing binary data in text-based formats (JSON, XML)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Base64Converter;
