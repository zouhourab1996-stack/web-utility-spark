import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const CurrencyRounder = () => {
  const [amount, setAmount] = useState<number>(47.89);
  const [currency, setCurrency] = useState<string>("USD");
  const [roundingRule, setRoundingRule] = useState<string>("nearest");
  const seoConfig = seoConfigs["/currency-rounder"];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "$", name: "Australian Dollar" },
  ];

  const roundAmount = (value: number, rule: string) => {
    switch (rule) {
      case "up":
        return Math.ceil(value);
      case "down":
        return Math.floor(value);
      case "nearest":
        return Math.round(value);
      case "nearest5":
        return Math.round(value / 5) * 5;
      case "nearest10":
        return Math.round(value / 10) * 10;
      default:
        return value;
    }
  };

  const getCurrentSymbol = () => {
    return currencies.find((c) => c.code === currency)?.symbol || "$";
  };

  const rounded = roundAmount(amount, roundingRule);

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Local Currency Quick-Rounding Price Tagger</h1>
          <p className="text-lg text-muted-foreground">
            Round prices to convenient amounts for pricing tags and displays
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Price Settings</CardTitle>
            <CardDescription>Enter amount and select rounding preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.code} - {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Rounding Rule</Label>
              <Select value={roundingRule} onValueChange={setRoundingRule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Nearest Whole Number</SelectItem>
                  <SelectItem value="up">Round Up</SelectItem>
                  <SelectItem value="down">Round Down</SelectItem>
                  <SelectItem value="nearest5">Nearest 5</SelectItem>
                  <SelectItem value="nearest10">Nearest 10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
          <CardHeader>
            <CardTitle>Rounded Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Original</p>
                <p className="text-2xl font-semibold">
                  {getCurrentSymbol()}{amount.toFixed(2)}
                </p>
              </div>
              <div className="text-5xl font-bold text-primary">↓</div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Rounded</p>
                <p className="text-5xl font-bold text-primary">
                  {getCurrentSymbol()}{rounded.toFixed(2)}
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Difference: {getCurrentSymbol()}
                  {Math.abs(rounded - amount).toFixed(2)}
                  {rounded > amount ? " more" : " less"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rounding Guide</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <strong>Nearest:</strong> 47.89 → 48.00</p>
            <p>• <strong>Round Up:</strong> 47.89 → 48.00 (always higher)</p>
            <p>• <strong>Round Down:</strong> 47.89 → 47.00 (always lower)</p>
            <p>• <strong>Nearest 5:</strong> 47.89 → 50.00</p>
            <p>• <strong>Nearest 10:</strong> 47.89 → 50.00</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CurrencyRounder;
