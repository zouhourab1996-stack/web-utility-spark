import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  SHARE_PLATFORMS,
  ShareData,
  nativeShare,
  canUseWebShare,
  copyToClipboard,
  addUTMParams,
  recordShareEvent,
} from "@/utils/shareUtils";

interface ShareBarProps {
  data: ShareData;
  className?: string;
  compact?: boolean;
  includeDonation?: boolean;
}

const ShareBar = ({ data, className = "", compact = false, includeDonation = false }: ShareBarProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const showNativeShare = canUseWebShare();

  const handleNativeShare = async () => {
    const success = await nativeShare(data);
    if (success) {
      recordShareEvent('native', data.url, 'share-bar');
      toast({
        title: "Shared successfully",
        description: "Thank you for sharing!",
      });
    }
  };

  const handlePlatformShare = (platformName: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
    recordShareEvent(platformName.toLowerCase(), data.url, 'share-bar');
    
    toast({
      title: `Opening ${platformName}`,
      description: "Thank you for sharing!",
    });
  };

  const handleCopyLink = async () => {
    const urlWithUTM = addUTMParams(data.url, 'copy');
    const success = await copyToClipboard(urlWithUTM);
    
    if (success) {
      setCopied(true);
      recordShareEvent('copy', data.url, 'share-bar');
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 3000);
    } else {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {!compact && (
        <span className="text-sm text-muted-foreground mr-2">Share:</span>
      )}
      
      {showNativeShare && (
        <Button
          variant="outline"
          size={compact ? "sm" : "default"}
          onClick={handleNativeShare}
          className="gap-2"
          aria-label="Share via native share"
        >
          <Share2 className="w-4 h-4" />
          {!compact && "Share"}
        </Button>
      )}

      {SHARE_PLATFORMS.map((platform) => {
        const shareUrl = platform.getUrl(data, includeDonation);
        
        return (
          <Button
            key={platform.name}
            variant="outline"
            size={compact ? "sm" : "default"}
            onClick={() => handlePlatformShare(platform.name, shareUrl)}
            className="gap-2"
            style={{ borderColor: `${platform.color}20` }}
            aria-label={`Share on ${platform.name}`}
          >
            <span role="img" aria-hidden="true">{platform.icon}</span>
            {!compact && platform.name}
          </Button>
        );
      })}

      <Button
        variant="outline"
        size={compact ? "sm" : "default"}
        onClick={handleCopyLink}
        className="gap-2"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            {!compact && "Copied!"}
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            {!compact && "Copy Link"}
          </>
        )}
      </Button>
    </div>
  );
};

export default ShareBar;
