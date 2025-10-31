import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { submitCurrentPage, submitSitemap } from "@/utils/indexnow";
import { Loader2, Send, Globe } from "lucide-react";

export const IndexNowSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitCurrent = async () => {
    setIsSubmitting(true);
    try {
      const results = await submitCurrentPage();
      const successCount = results.filter(r => r.success).length;
      
      if (successCount > 0) {
        toast.success(`URL submitted to ${successCount} search engine(s)`);
      } else {
        toast.error("Failed to submit URL to search engines");
      }
    } catch (error) {
      toast.error("Error submitting to IndexNow");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSitemap = async () => {
    setIsSubmitting(true);
    try {
      const results = await submitSitemap();
      const successCount = results.filter(r => r.success).length;
      
      if (successCount > 0) {
        toast.success(`Sitemap submitted to ${successCount} search engine(s)`);
      } else {
        toast.error("Failed to submit sitemap to search engines");
      }
    } catch (error) {
      toast.error("Error submitting sitemap");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>IndexNow Integration</CardTitle>
        <CardDescription>
          Submit URLs instantly to Bing and Yandex for faster indexing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleSubmitCurrent} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Current Page
          </Button>
          
          <Button 
            onClick={handleSubmitSitemap} 
            disabled={isSubmitting}
            variant="secondary"
            className="w-full"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Globe className="mr-2 h-4 w-4" />
            )}
            Submit Entire Sitemap
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>✓ Verification file configured</p>
          <p>✓ API Key: a056ae0d787342ff9c70bce0dc58b379</p>
        </div>
      </CardContent>
    </Card>
  );
};
