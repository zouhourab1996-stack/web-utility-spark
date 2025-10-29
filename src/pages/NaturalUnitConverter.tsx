import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Repeat } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const NaturalUnitConverter = () => {
  const [input, setInput] = useState<string>("5 feet to meters");
  const [result, setResult] = useState<string>("");
  const seoConfig = seoConfigs["/natural-unit-converter"];

  const conversions: Record<string, Record<string, number | string>> = {
    // Length
    "feet": { "meters": 0.3048, "inches": 12, "cm": 30.48, "yards": 0.333 },
    "meters": { "feet": 3.281, "cm": 100, "km": 0.001, "miles": 0.000621 },
    "inches": { "cm": 2.54, "feet": 0.0833, "meters": 0.0254 },
    "cm": { "inches": 0.394, "meters": 0.01, "feet": 0.0328 },
    "miles": { "km": 1.609, "meters": 1609, "feet": 5280 },
    "km": { "miles": 0.621, "meters": 1000, "feet": 3281 },
    // Weight
    "pounds": { "kg": 0.454, "oz": 16, "grams": 454 },
    "kg": { "pounds": 2.205, "grams": 1000, "oz": 35.274 },
    "oz": { "grams": 28.35, "pounds": 0.0625, "kg": 0.0283 },
    "grams": { "oz": 0.0353, "kg": 0.001, "pounds": 0.0022 },
    // Temperature (special handling)
    "celsius": { "fahrenheit": "special", "kelvin": "special" },
    "fahrenheit": { "celsius": "special", "kelvin": "special" },
  };

  const parseInput = (input: string) => {
    const pattern = /(\d+\.?\d*)\s*([a-z]+)\s*(to|in)\s*([a-z]+)/i;
    const match = input.match(pattern);
    
    if (!match) {
      setResult("Please use format: '5 feet to meters'");
      return;
    }

    const [, value, fromUnit, , toUnit] = match;
    const num = parseFloat(value);
    const from = fromUnit.toLowerCase();
    const to = toUnit.toLowerCase();

    if (conversions[from] && conversions[from][to]) {
      const factor = conversions[from][to];
      if (typeof factor === "string" && factor === "special") {
        // Temperature conversion
        let converted = 0;
        if (from === "celsius" && to === "fahrenheit") {
          converted = (num * 9/5) + 32;
        } else if (from === "fahrenheit" && to === "celsius") {
          converted = (num - 32) * 5/9;
        }
        setResult(`${num} ${from} = ${converted.toFixed(2)} ${to}`);
      } else if (typeof factor === "number") {
        const converted = num * factor;
        setResult(`${num} ${from} = ${converted.toFixed(2)} ${to}`);
      }
    } else {
      setResult("Conversion not supported. Try: feet/meters/inches/cm/miles/km/pounds/kg/oz/grams");
    }
  };

  const handleConvert = () => {
    parseInput(input);
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Repeat className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Natural Language Unit Converter</h1>
          <p className="text-lg text-muted-foreground">
            Type conversions naturally: "5 feet to meters" or "100 pounds to kg"
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Conversion</CardTitle>
            <CardDescription>Examples: "10 miles to km", "70 fahrenheit to celsius"</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="5 feet to meters"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
            />
            <button
              onClick={handleConvert}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Convert
            </button>
            {result && (
              <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{result}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Supported Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Length</p>
                <p className="text-muted-foreground">feet, meters, inches, cm, miles, km, yards</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Weight</p>
                <p className="text-muted-foreground">pounds, kg, oz, grams</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Temperature</p>
                <p className="text-muted-foreground">celsius, fahrenheit, kelvin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NaturalUnitConverter;
