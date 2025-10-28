import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SavingsCalculator = () => {
  const [initialAmount, setInitialAmount] = useState<string>("1000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("100");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [years, setYears] = useState<string>("10");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalContributions: number;
    totalInterest: number;
  } | null>(null);

  const calculateSavings = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(years) * 12;

    let balance = initial;
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + rate) + monthly;
    }

    const totalContributions = initial + monthly * months;
    const totalInterest = balance - totalContributions;

    setResult({
      finalAmount: balance,
      totalContributions,
      totalInterest,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Savings Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Plan your savings goals and track progress toward financial targets
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Savings Growth</CardTitle>
            <CardDescription>Enter your savings details to see how your money will grow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="initial">Initial Amount ($)</Label>
                <Input
                  id="initial"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Contribution ($)</Label>
                <Input
                  id="monthly"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Time Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>

            <Button onClick={calculateSavings} className="w-full gradient-primary text-white">
              Calculate Savings
            </Button>

            {result && (
              <div className="mt-8 p-6 bg-secondary rounded-lg space-y-4">
                <h3 className="text-xl font-semibold mb-4">Savings Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Final Amount</p>
                    <p className="text-2xl font-bold text-primary">${result.finalAmount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
                    <p className="text-2xl font-bold">${result.totalContributions.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-accent">${result.totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsCalculator;
