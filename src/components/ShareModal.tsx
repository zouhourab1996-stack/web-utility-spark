import { useState } from "react";
import { X, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ShareBar from "./ShareBar";
import { ShareData, markShareModalShown } from "@/utils/shareUtils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ShareData;
  message?: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  data,
  message = "Love this tool? Share it with others!",
}: ShareModalProps) => {
  const [includeDonation, setIncludeDonation] = useState(false);

  const handleClose = () => {
    markShareModalShown();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            Share with Friends
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ShareBar data={data} includeDonation={includeDonation} />

          <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
            <Checkbox
              id="donation"
              checked={includeDonation}
              onCheckedChange={(checked) => setIncludeDonation(checked as boolean)}
              aria-label="Include donation note in share message"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="donation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Include donation note
              </Label>
              <p className="text-xs text-muted-foreground">
                Add a message about supporting a rural well project in Tunisia
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">💧 Support Our Mission</p>
              <p>
                Donations help fund a rural water well project in Tunisia, bringing clean water
                to communities in need.
              </p>
              <div className="space-y-1 text-xs bg-muted/30 p-3 rounded">
                <p>
                  <strong>PayPal:</strong> anistouati74@gmail.com
                </p>
                <p className="break-all">
                  <strong>USDT (BNB):</strong> 0x63e8f2a6C384E2d07Bb5061d36682659f7A3BE08
                </p>
              </div>
              <p className="text-xs italic">
                All donations are optional and voluntary. No donations are required to use our
                free tools.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
