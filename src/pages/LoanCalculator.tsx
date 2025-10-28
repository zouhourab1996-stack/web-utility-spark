import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("200000");
  const [interestRate, setInterestRate] = useState("4.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [result, setResult] = useState<{ monthly: number; total: number; totalInterest: number } | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n)) {
      return;
    }

    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    setResult({
      monthly: monthlyPayment,
      total: totalPayment,
      totalInterest: totalInterest,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <DollarSign className="w-10 h-10 mr-3 text-primary" />
            Loan Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly loan payments and total interest cost
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Enter your loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="200000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="4.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="30"
                />
              </div>

              <Button onClick={calculateLoan} className="w-full gradient-primary">
                Calculate Payment
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Your loan payment breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                  <p className="text-3xl font-bold text-primary">
                    ${result.monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                  <p className="text-2xl font-bold">
                    ${result.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-accent">
                    ${result.totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    You will pay <span className="font-bold text-accent">
                      {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(2)}%
                    </span> of the loan amount in interest over {loanTerm} years
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How Loan Payments Work</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Loan payments are calculated using an amortization formula that ensures you pay off both the principal and interest over the loan term. Early payments are mostly interest, while later payments go more toward the principal.
            </p>
            <p className="mt-4">
              <strong>Tips for managing your loan:</strong>
            </p>
            <ul className="mt-2">
              <li>Make extra principal payments to reduce total interest</li>
              <li>Consider bi-weekly payments instead of monthly</li>
              <li>Shop around for the best interest rates</li>
              <li>Refinance if rates drop significantly</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanCalculator;
