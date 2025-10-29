import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const AccessibilityChecker = () => {
  const [textColor, setTextColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const seoConfig = seoConfigs["/accessibility-checker"];

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = () => {
    const text = hexToRgb(textColor);
    const bg = hexToRgb(bgColor);
    
    if (!text || !bg) return 0;
    
    const l1 = getLuminance(text.r, text.g, text.b);
    const l2 = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  };

  const ratio = getContrastRatio();
  const passesAANormal = ratio >= 4.5;
  const passesAALarge = ratio >= 3;
  const passesAAA = ratio >= 7;

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Eye className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Contrast & Accessibility Checker</h1>
          <p className="text-lg text-muted-foreground">
            Check color contrast ratios for WCAG accessibility compliance
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Color Selection</CardTitle>
            <CardDescription>Choose text and background colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="p-8 rounded-lg text-center"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              <h2 className="text-3xl font-bold mb-2">Sample Heading</h2>
              <p className="text-lg">This is sample body text to preview contrast</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contrast Ratio Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Contrast Ratio</p>
              <p className="text-5xl font-bold text-primary">{ratio.toFixed(2)}:1</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-secondary rounded">
                <span>WCAG AA (Normal Text)</span>
                <span className={`font-semibold ${passesAANormal ? 'text-green-600' : 'text-red-600'}`}>
                  {passesAANormal ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded">
                <span>WCAG AA (Large Text 18pt+)</span>
                <span className={`font-semibold ${passesAALarge ? 'text-green-600' : 'text-red-600'}`}>
                  {passesAALarge ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded">
                <span>WCAG AAA (Enhanced)</span>
                <span className={`font-semibold ${passesAAA ? 'text-green-600' : 'text-red-600'}`}>
                  {passesAAA ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AccessibilityChecker;
