import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareData, buildShareMessage, addUTMParams, recordShareEvent } from "@/utils/shareUtils";

interface ShareComposerProps {
  data: ShareData;
  className?: string;
}

const ShareComposer = ({ data, className = "" }: ShareComposerProps) => {
  const [customMessage, setCustomMessage] = useState(() => buildShareMessage(data, false));
  const [includeDonation, setIncludeDonation] = useState(false);

  const handleReset = () => {
    setCustomMessage(buildShareMessage(data, includeDonation));
  };

  const handleShareTwitter = () => {
    const url = addUTMParams(data.url, 'twitter-composer');
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    recordShareEvent('twitter-composer', data.url, 'composer');
  };

  const handleShareWhatsApp = () => {
    const url = addUTMParams(data.url, 'whatsapp-composer');
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(customMessage + '\n' + url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    recordShareEvent('whatsapp-composer', data.url, 'composer');
  };

  const handleShareTelegram = () => {
    const url = addUTMParams(data.url, 'telegram-composer');
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(customMessage)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    recordShareEvent('telegram-composer', data.url, 'composer');
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Compose Your Share
        </CardTitle>
        <CardDescription>
          Customize your message before sharing on social media
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={6}
            className="resize-none font-mono text-sm"
            placeholder="Write your custom message..."
            aria-label="Compose share message"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{customMessage.length} characters</span>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset to default
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Suggested Hashtags</Label>
          <div className="flex flex-wrap gap-2">
            {(data.hashtags || ["SmartToolsHub", "FreeTools", "Productivity", "Tunisia"]).map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    if (!customMessage.includes(`#${tag}`)) {
                      setCustomMessage((prev) => prev + ` #${tag}`);
                    }
                  }}
                  className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                >
                  #{tag}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button onClick={handleShareTwitter} className="gap-2">
            <span role="img" aria-hidden="true">𝕏</span>
            Share on Twitter
          </Button>
          <Button onClick={handleShareWhatsApp} variant="outline" className="gap-2">
            <span role="img" aria-hidden="true">💬</span>
            WhatsApp
          </Button>
          <Button onClick={handleShareTelegram} variant="outline" className="gap-2">
            <span role="img" aria-hidden="true">✈️</span>
            Telegram
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          💡 Tip: Add emojis and personal thoughts to make your share more engaging!
        </p>
      </CardContent>
    </Card>
  );
};

export default ShareComposer;
