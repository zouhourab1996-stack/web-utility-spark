import { useState } from "react";
import { Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BMICalculator = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{ bmi: number; category: string; description: string } | null>(null);

  const calculateBMI = () => {
    let bmi: number;
    
    if (unit === "metric") {
      const weightKg = parseFloat(weight);
      const heightM = parseFloat(height) / 100;
      bmi = weightKg / (heightM * heightM);
    } else {
      const weightLbs = parseFloat(weight);
      const heightInches = parseFloat(height);
      bmi = (weightLbs / (heightInches * heightInches)) * 703;
    }

    let category = "";
    let description = "";

    if (bmi < 18.5) {
      category = "Underweight";
      description = "You may need to gain weight. Consult with a healthcare provider.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal weight";
      description = "You're in a healthy weight range. Keep up the good work!";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      description = "Consider a balanced diet and regular exercise.";
    } else {
      category = "Obese";
      description = "Consult with a healthcare provider for personalized advice.";
    }

    setResult({ bmi, category, description });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <Scale className="w-10 h-10 mr-3 text-primary" />
            BMI Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Body Mass Index and get health recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Measurements</CardTitle>
              <CardDescription>Enter your weight and height</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unit">Unit System</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">
                  Height ({unit === "metric" ? "cm" : "inches"})
                </Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "170" : "67"}
                />
              </div>

              <Button onClick={calculateBMI} className="w-full gradient-primary">
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>Body Mass Index analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
                  <p className="text-5xl font-bold text-primary mb-2">
                    {result.bmi.toFixed(1)}
                  </p>
                  <p className="text-xl font-semibold text-accent">
                    {result.category}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm">{result.description}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>Underweight</span>
                    <span className="text-muted-foreground">&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Normal weight</span>
                    <span className="text-muted-foreground">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Overweight</span>
                    <span className="text-muted-foreground">25 - 29.9</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Obese</span>
                    <span className="text-muted-foreground">≥ 30</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About BMI</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Body Mass Index (BMI) is a measure of body fat based on height and weight. While it's a useful screening tool, it doesn't directly measure body fat percentage or account for muscle mass, bone density, and other factors.
            </p>
            <p className="mt-4">
              <strong>Important notes:</strong>
            </p>
            <ul>
              <li>BMI may not be accurate for athletes with high muscle mass</li>
              <li>It may overestimate body fat in older adults who have lost muscle</li>
              <li>Always consult healthcare professionals for medical advice</li>
              <li>Consider other health indicators like waist circumference and overall fitness</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BMICalculator;
