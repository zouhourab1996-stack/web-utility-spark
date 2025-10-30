import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";
import AnalyticsSettings from "@/components/AnalyticsSettings";
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
