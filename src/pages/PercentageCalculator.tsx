import { useState } from "react";
import { Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PercentageCalculator = () => {
  const [value1, setValue1] = useState("50");
  const [value2, setValue2] = useState("200");
  const [percentValue, setPercentValue] = useState("25");
  const [baseValue, setBaseValue] = useState("80");

  const calculatePercentage = (part: number, whole: number): number => {
    return (part / whole) * 100;
  };

  const calculateAmount = (percent: number, base: number): number => {
    return (percent / 100) * base;
  };

  const calculateIncrease = (original: number, newVal: number): number => {
    return ((newVal - original) / original) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Percent className="w-10 h-10 mr-3 text-primary" />
            Percentage Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate percentages, increases, decreases, and more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>What % of X is Y?</CardTitle>
              <CardDescription>Calculate what percentage one number is of another</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="val1">Number (Y)</Label>
                <Input
                  id="val1"
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="val2">Total (X)</Label>
                <Input
                  id="val2"
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                />
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="text-3xl font-bold text-primary">
                  {calculatePercentage(parseFloat(value1), parseFloat(value2)).toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {value1} is {calculatePercentage(parseFloat(value1), parseFloat(value2)).toFixed(2)}% of {value2}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>X% of Y is?</CardTitle>
              <CardDescription>Calculate a percentage of a number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="percent">Percentage (X)</Label>
                <Input
                  id="percent"
                  type="number"
                  value={percentValue}
                  onChange={(e) => setPercentValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base">Number (Y)</Label>
                <Input
                  id="base"
                  type="number"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                />
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="text-3xl font-bold text-primary">
                  {calculateAmount(parseFloat(percentValue), parseFloat(baseValue)).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {percentValue}% of {baseValue} is {calculateAmount(parseFloat(percentValue), parseFloat(baseValue)).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Percentage Increase</CardTitle>
              <CardDescription>Calculate percentage change from original to new value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="original">Original Value</Label>
                <Input
                  id="original"
                  type="number"
                  defaultValue="100"
                  onChange={(e) => {
                    const inc = calculateIncrease(parseFloat(e.target.value), parseFloat((e.target.nextSibling as HTMLInputElement)?.value || "120"));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Value</Label>
                <Input
                  id="new"
                  type="number"
                  defaultValue="120"
                />
              </div>
              <Button 
                onClick={() => {
                  const original = parseFloat((document.getElementById('original') as HTMLInputElement).value);
                  const newVal = parseFloat((document.getElementById('new') as HTMLInputElement).value);
                  const result = calculateIncrease(original, newVal);
                  (document.getElementById('increase-result') as HTMLElement).textContent = 
                    `${result > 0 ? '+' : ''}${result.toFixed(2)}%`;
                }}
                className="w-full gradient-primary"
              >
                Calculate Change
              </Button>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Percentage Change</p>
                <p id="increase-result" className="text-3xl font-bold text-accent">
                  +20.00%
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Percentage Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-semibold mb-1">10% of any number</p>
                <p className="text-sm text-muted-foreground">Move decimal point one place left</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-semibold mb-1">50% of any number</p>
                <p className="text-sm text-muted-foreground">Divide by 2</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-semibold mb-1">25% of any number</p>
                <p className="text-sm text-muted-foreground">Divide by 4</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="font-semibold mb-1">Double check</p>
                <p className="text-sm text-muted-foreground">X% of Y = Y% of X</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Common Percentage Uses</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Percentages are used in many everyday situations:</p>
            <ul>
              <li><strong>Shopping:</strong> Calculate discounts and sales prices</li>
              <li><strong>Finance:</strong> Interest rates, investment returns, and loan calculations</li>
              <li><strong>Business:</strong> Profit margins, growth rates, and market share</li>
              <li><strong>Education:</strong> Test scores and grades</li>
              <li><strong>Statistics:</strong> Data analysis and probability</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PercentageCalculator;
