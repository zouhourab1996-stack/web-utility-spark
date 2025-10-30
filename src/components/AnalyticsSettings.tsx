import { useState, useEffect } from "react";
import { BarChart3, Shield, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  isAnalyticsEnabled,
  setAnalyticsEnabled,
} from "@/utils/shareUtils";
import {
  getAnalyticsSummary,
  clearAnalytics,
  exportAnalytics,
} from "@/utils/analytics";

const AnalyticsSettings = () => {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [summary, setSummary] = useState<ReturnType<typeof getAnalyticsSummary> | null>(null);

  useEffect(() => {
    setEnabled(isAnalyticsEnabled());
    if (isAnalyticsEnabled()) {
      setSummary(getAnalyticsSummary());
    }
  }, []);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    setAnalyticsEnabled(checked);
    
    toast({
      title: checked ? "Analytics enabled" : "Analytics disabled",
      description: checked
        ? "We'll track your usage locally to improve your experience"
        : "No analytics data will be collected",
    });

    if (checked) {
      setSummary(getAnalyticsSummary());
    }
  };

  const handleClearData = () => {
    clearAnalytics();
    setSummary(getAnalyticsSummary());
    
    toast({
      title: "Analytics cleared",
      description: "All local analytics data has been removed",
    });
  };

  const handleExport = () => {
    const data = exportAnalytics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-tools-hub-analytics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Analytics exported",
      description: "Your data has been downloaded",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Privacy & Analytics Settings
        </CardTitle>
        <CardDescription>
          Control your data collection preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex-1 space-y-1">
            <Label htmlFor="analytics" className="text-base cursor-pointer">
              Enable Local Analytics
            </Label>
            <p className="text-sm text-muted-foreground">
              Track your usage locally to see statistics. No data is sent to external servers.
            </p>
          </div>
          <Switch
            id="analytics"
            checked={enabled}
            onCheckedChange={handleToggle}
            aria-label="Toggle analytics"
          />
        </div>

        {enabled && summary && (
          <>
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Your Usage Summary</h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-2xl font-bold">{summary.pageViews}</p>
                  <p className="text-xs text-muted-foreground">Page Views</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-2xl font-bold">{summary.toolUsage}</p>
                  <p className="text-xs text-muted-foreground">Tools Used</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-2xl font-bold">{summary.shares}</p>
                  <p className="text-xs text-muted-foreground">Shares</p>
                </div>
              </div>

              {summary.topTools.length > 0 && (
                <div>
                  <h5 className="font-medium text-xs mb-2">Most Used Tools</h5>
                  <div className="space-y-1">
                    {summary.topTools.slice(0, 5).map(([tool, count]) => (
                      <div key={tool} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{tool}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />
            
            <div className="flex gap-2">
              <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button onClick={handleClearData} variant="outline" size="sm" className="gap-2 text-destructive">
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </Button>
            </div>
          </>
        )}

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 mt-0.5 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Privacy First</p>
              <p className="text-xs text-muted-foreground">
                All analytics are stored locally in your browser. No personal data is collected
                or transmitted to external servers. You have full control over your data.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSettings;
