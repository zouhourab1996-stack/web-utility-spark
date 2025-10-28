import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const QRGenerator = () => {
  const [text, setText] = useState<string>("");
  const [qrUrl, setQrUrl] = useState<string>("");

  const generateQR = () => {
    if (!text.trim()) return;
    const encodedText = encodeURIComponent(text);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedText}`;
    setQrUrl(url);
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-lg text-muted-foreground">
            Create QR codes for URLs, text, and contact information
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>Enter text or URL to create a QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Text or URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data"
                rows={4}
              />
            </div>

            <Button onClick={generateQR} className="w-full gradient-primary text-white">
              Generate QR Code
            </Button>

            {qrUrl && (
              <div className="mt-8 p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-center">Your QR Code</h3>
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <img src={qrUrl} alt="QR Code" className="w-full max-w-xs" />
                  </div>
                  <Button onClick={downloadQR} className="gradient-accent text-white">
                    Download QR Code
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;
