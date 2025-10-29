import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Download } from "lucide-react";
import QRCode from "qrcode";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const DonationQRBuilder = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("paypal");
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  const [cryptoAddress, setCryptoAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const { toast } = useToast();
  const seoConfig = seoConfigs["/donation-qr-builder"];

  const generateQRCode = async () => {
    let paymentUrl = "";
    
    if (paymentMethod === "paypal" && paypalEmail) {
      paymentUrl = `https://www.paypal.com/paypalme/${paypalEmail.replace('@', '')}`;
      if (amount) paymentUrl += `/${amount}`;
    } else if (paymentMethod === "crypto" && cryptoAddress) {
      paymentUrl = cryptoAddress;
    } else {
      toast({
        title: "Error",
        description: "Please fill in the required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const qr = await QRCode.toDataURL(paymentUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCode(qr);
      toast({
        title: "Success!",
        description: "QR code generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "donation-qr-code.png";
    link.href = qrCode;
    link.click();
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Donation QR / Pay Link Builder</h1>
          <p className="text-lg text-muted-foreground">
            Create QR codes for accepting donations via PayPal or cryptocurrency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Configure your donation payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "paypal" ? (
                <>
                  <div>
                    <Label>PayPal Email</Label>
                    <Input
                      placeholder="your-email@example.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Amount (optional)</Label>
                    <Input
                      type="number"
                      placeholder="25.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div>
                  <Label>Crypto Wallet Address</Label>
                  <Input
                    placeholder="0x..."
                    value={cryptoAddress}
                    onChange={(e) => setCryptoAddress(e.target.value)}
                  />
                </div>
              )}

              <div>
                <Label>Message (optional)</Label>
                <Input
                  placeholder="Support our cause"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button onClick={generateQRCode} className="w-full">
                Generate QR Code
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>Scan to donate</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
              {qrCode ? (
                <>
                  <img src={qrCode} alt="Donation QR Code" className="w-64 h-64 mb-4" />
                  {message && (
                    <p className="text-center text-sm text-muted-foreground mb-4">{message}</p>
                  )}
                  <Button onClick={downloadQRCode} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-center">
                  Configure payment details and generate QR code
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DonationQRBuilder;
