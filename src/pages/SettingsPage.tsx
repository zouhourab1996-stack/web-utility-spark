import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";
import AnalyticsSettings from "@/components/AnalyticsSettings";
import { IndexNowSubmit } from "@/components/IndexNowSubmit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO {...seoConfigs["/"]} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Settings className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Settings & Preferences
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your privacy preferences and analytics settings
          </p>
        </div>

        <div className="space-y-6">
          <AnalyticsSettings />
          
          <IndexNowSubmit />
          
          <Card>
            <CardHeader>
              <CardTitle>Google Search Console Setup</CardTitle>
              <CardDescription>
                Step-by-step guide to submit your site to Google
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Add Your Property</h4>
                  <p className="text-muted-foreground">
                    Visit <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Search Console</a> and add property: <code className="bg-muted px-2 py-1 rounded">https://freeadstools.wuaze.com</code>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2. Verify Ownership</h4>
                  <p className="text-muted-foreground mb-2">Choose one verification method:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>HTML file upload:</strong> Download verification file and add to <code className="bg-muted px-1 rounded">public/</code> folder</li>
                    <li><strong>HTML tag:</strong> Add meta tag to <code className="bg-muted px-1 rounded">index.html</code> &lt;head&gt;</li>
                    <li><strong>DNS record:</strong> Add TXT record to your domain DNS settings</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">3. Submit Sitemap</h4>
                  <p className="text-muted-foreground">
                    After verification, go to Sitemaps → Add new sitemap → Enter: <code className="bg-muted px-2 py-1 rounded">sitemap.xml</code>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">4. Request Indexing</h4>
                  <p className="text-muted-foreground">
                    Use URL Inspection tool to request indexing for important pages. Google typically indexes within 1-7 days.
                  </p>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                  <p className="text-sm font-medium text-primary mb-1">📊 Analytics Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    View your site analytics at <a href="https://plausible.io/freeadstools.wuaze.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Plausible Dashboard</a> (privacy-friendly, no personal data collected)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Smart Tools Hub</CardTitle>
              <CardDescription>
                Free online tools for productivity, calculations, and conversions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  Smart Tools Hub provides 30+ free online utilities for everyday tasks.
                  All tools work offline and respect your privacy.
                </p>
                <p>
                  We don't collect personal data. Analytics (if enabled) are stored locally
                  on your device only.
                </p>
                <p>
                  Donations support a rural water well project in Tunisia 🌾
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
