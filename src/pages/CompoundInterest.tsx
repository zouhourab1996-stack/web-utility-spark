import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("10");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      return;
    }

    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    setResult({
      total: amount,
      interest: interest,
    });
  };

  const seoConfig = seoConfigs["/compound-interest"];

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        canonical={seoConfig.canonical}
        schema={seoConfig.schema}
      />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Calculator className="w-10 h-10 mr-3 text-primary" />
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate how your investments grow with compound interest over time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Values</CardTitle>
              <CardDescription>Enter your investment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount ($)</Label>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Period (years)</Label>
                <Input
                  id="time"
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Compound Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateCompoundInterest} className="w-full gradient-primary">
                Calculate
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Your investment growth summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Future Value</p>
                  <p className="text-3xl font-bold text-primary">
                    ${result.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest Earned</p>
                  <p className="text-2xl font-bold text-accent">
                    ${result.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Principal Amount</p>
                  <p className="text-xl font-semibold">
                    ${parseFloat(principal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Your investment will grow by <span className="font-bold text-accent">
                      {((result.interest / parseFloat(principal)) * 100).toFixed(2)}%
                    </span> over {time} years
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About Compound Interest</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Compound interest is the interest calculated on the initial principal and also on the accumulated interest of previous periods. It's often called "interest on interest" and can significantly increase your investment returns over time.
            </p>
            <p className="mt-4">
              <strong>Formula:</strong> A = P(1 + r/n)<sup>nt</sup>
            </p>
            <ul className="mt-2">
              <li>A = Final amount</li>
              <li>P = Principal (initial investment)</li>
              <li>r = Annual interest rate (decimal)</li>
              <li>n = Number of times interest is compounded per year</li>
              <li>t = Time in years</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default CompoundInterest;
