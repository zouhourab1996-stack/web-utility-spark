import { useEffect, useState } from "react";
import { Gift, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { checkReferral } from "@/utils/shareUtils";

const ReferralBadge = () => {
  const [showBadge, setShowBadge] = useState(false);
  const [refToken, setRefToken] = useState<string | null>(null);

  useEffect(() => {
    const ref = checkReferral();
    if (ref) {
      setRefToken(ref);
      setShowBadge(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowBadge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showBadge) return null;

  return (
    <Alert className="fixed top-20 right-4 max-w-sm z-50 animate-fade-in shadow-lg border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <Gift className="h-4 w-4 text-primary" />
      <AlertDescription className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-sm">Welcome, friend! 👋</p>
          <p className="text-xs text-muted-foreground mt-1">
            You came from a shared link. Enjoy exploring our free tools!
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBadge(false)}
          className="h-6 w-6 p-0"
          aria-label="Close referral badge"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ReferralBadge;
