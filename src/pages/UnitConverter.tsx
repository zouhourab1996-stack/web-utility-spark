import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UnitConverter = () => {
  const [lengthValue, setLengthValue] = useState<string>("1");
  const [lengthFrom, setLengthFrom] = useState<string>("meter");
  const [lengthTo, setLengthTo] = useState<string>("foot");
  
  const [weightValue, setWeightValue] = useState<string>("1");
  const [weightFrom, setWeightFrom] = useState<string>("kilogram");
  const [weightTo, setWeightTo] = useState<string>("pound");

  const lengthUnits: Record<string, number> = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
  };

  const weightUnits: Record<string, number> = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000,
  };

  const convertLength = () => {
    const value = parseFloat(lengthValue) || 0;
    const fromValue = lengthUnits[lengthFrom];
    const toValue = lengthUnits[lengthTo];
    return ((value * fromValue) / toValue).toFixed(6);
  };

  const convertWeight = () => {
    const value = parseFloat(weightValue) || 0;
    const fromValue = weightUnits[weightFrom];
    const toValue = weightUnits[weightTo];
    return ((value * fromValue) / toValue).toFixed(6);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Unit Converter</h1>
          <p className="text-lg text-muted-foreground">
            Convert between different units of measurement instantly
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Universal Unit Converter</CardTitle>
            <CardDescription>Select a category and convert between units</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="length" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="length">Length</TabsTrigger>
                <TabsTrigger value="weight">Weight</TabsTrigger>
              </TabsList>

              <TabsContent value="length" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lengthValue">Value</Label>
                    <Input
                      id="lengthValue"
                      type="number"
                      value={lengthValue}
                      onChange={(e) => setLengthValue(e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lengthFrom">From</Label>
                    <Select value={lengthFrom} onValueChange={setLengthFrom}>
                      <SelectTrigger id="lengthFrom">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(lengthUnits).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lengthTo">To</Label>
                    <Select value={lengthTo} onValueChange={setLengthTo}>
                      <SelectTrigger id="lengthTo">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(lengthUnits).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Result</Label>
                    <div className="p-3 bg-secondary rounded-lg text-2xl font-bold text-primary">
                      {convertLength()} {lengthTo}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="weight" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weightValue">Value</Label>
                    <Input
                      id="weightValue"
                      type="number"
                      value={weightValue}
                      onChange={(e) => setWeightValue(e.target.value)}
                      placeholder="Enter value"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weightFrom">From</Label>
                    <Select value={weightFrom} onValueChange={setWeightFrom}>
                      <SelectTrigger id="weightFrom">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(weightUnits).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weightTo">To</Label>
                    <Select value={weightTo} onValueChange={setWeightTo}>
                      <SelectTrigger id="weightTo">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(weightUnits).map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Result</Label>
                    <div className="p-3 bg-secondary rounded-lg text-2xl font-bold text-primary">
                      {convertWeight()} {weightTo}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnitConverter;
