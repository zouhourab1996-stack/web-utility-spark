import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DonateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DonateModal = ({ open, onOpenChange }: DonateModalProps) => {
  const { toast } = useToast();
  const usdtAddress = "0x63e8f2e80c81523Cc896f44743Da19aFbd8D04eD";

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtAddress);
    toast({ title: "Copied!", description: "USDT address copied to clipboard" });
  };

  const openPayPal = () => {
    window.open("https://www.paypal.com/donate?business=anistouati74%40gmail.com", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Support Our Mission
          </DialogTitle>
          <DialogDescription>
            Your donations help complete a farmer's well in a rural area in Tunisia.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Donate via PayPal:</p>
            <Button onClick={openPayPal} className="w-full" size="lg">
              <Heart className="w-4 h-4 mr-2" />
              Donate with PayPal
            </Button>
            <p className="text-xs text-center mt-2 text-muted-foreground">anistouati74@gmail.com</p>
          </div>

          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Donate via USDT (BNB Chain):</p>
            <div className="flex gap-2">
              <input
                value={usdtAddress}
                readOnly
                className="flex-1 px-3 py-2 text-xs bg-background rounded border"
              />
              <Button onClick={copyAddress} size="sm" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground italic">
            Every contribution makes a difference. Thank you for your generosity! 🌾
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonateModal;
