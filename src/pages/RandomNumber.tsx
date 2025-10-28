import { useState } from "react";
import { Dices, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const RandomNumber = () => {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [quantity, setQuantity] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);

  const generateRandomNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const qty = parseInt(quantity);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(qty)) {
      return;
    }

    if (minNum >= maxNum) {
      return;
    }

    if (!allowDuplicates && qty > (maxNum - minNum + 1)) {
      return;
    }

    const numbers: number[] = [];
    
    if (allowDuplicates) {
      for (let i = 0; i < qty; i++) {
        numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
      }
    } else {
      const available = Array.from({ length: maxNum - minNum + 1 }, (_, i) => i + minNum);
      for (let i = 0; i < qty; i++) {
        const index = Math.floor(Math.random() * available.length);
        numbers.push(available[index]);
        available.splice(index, 1);
      }
    }

    setResults(numbers);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Dices className="w-10 h-10 mr-3 text-primary" />
            Random Number Generator
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate random numbers for any range or purpose
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
              <CardDescription>Configure your random number parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min">Minimum</Label>
                  <Input
                    id="min"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Maximum</Label>
                  <Input
                    id="max"
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (how many numbers)</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="duplicates"
                  checked={allowDuplicates}
                  onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
                />
                <Label htmlFor="duplicates" className="cursor-pointer">
                  Allow duplicate numbers
                </Label>
              </div>

              <Button onClick={generateRandomNumbers} className="w-full gradient-primary">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate Numbers
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Numbers</CardTitle>
              <CardDescription>
                {results.length > 0 ? `${results.length} random number${results.length > 1 ? 's' : ''} generated` : 'Click generate to see results'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {results.map((num, index) => (
                      <div
                        key={index}
                        className="p-3 bg-secondary rounded-lg text-center font-bold text-lg"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sum</p>
                        <p className="text-xl font-bold text-primary">
                          {results.reduce((a, b) => a + b, 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Average</p>
                        <p className="text-xl font-bold text-primary">
                          {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Dices className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No numbers generated yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Presets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setMin("1");
                  setMax("6");
                  setQuantity("1");
                  setAllowDuplicates(true);
                }}
              >
                🎲 Dice Roll (1-6)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setMin("1");
                  setMax("100");
                  setQuantity("1");
                  setAllowDuplicates(true);
                }}
              >
                🔢 Random 1-100
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setMin("1");
                  setMax("10");
                  setQuantity("3");
                  setAllowDuplicates(false);
                }}
              >
                🎯 Pick 3 from 10
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Common Uses</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <ul className="space-y-1">
                <li>Random selection for giveaways and contests</li>
                <li>Generating lottery numbers</li>
                <li>Creating test data and samples</li>
                <li>Gaming and simulations</li>
                <li>Random sampling for surveys</li>
                <li>Password generation components</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RandomNumber;
