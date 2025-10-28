import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

    setResult({
      years,
      months,
      days,
      hours,
      minutes,
      totalDays,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Age Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your exact age down to days, hours, and minutes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Age</CardTitle>
            <CardDescription>Enter your birth date to see your exact age</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <Button onClick={calculateAge} className="w-full gradient-primary text-white">
              Calculate Age
            </Button>

            {result && (
              <div className="mt-8 space-y-6">
                <div className="p-6 bg-secondary rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Your Age</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-card rounded-lg">
                      <p className="text-3xl font-bold text-primary">{result.years}</p>
                      <p className="text-sm text-muted-foreground mt-1">Years</p>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <p className="text-3xl font-bold text-primary">{result.months}</p>
                      <p className="text-sm text-muted-foreground mt-1">Months</p>
                    </div>
                    <div className="text-center p-4 bg-card rounded-lg">
                      <p className="text-3xl font-bold text-primary">{result.days}</p>
                      <p className="text-sm text-muted-foreground mt-1">Days</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-secondary rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Total Days Lived:</span>
                      <span className="font-bold">{result.totalDays.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Total Hours:</span>
                      <span className="font-bold">{(result.totalDays * 24).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-card rounded-lg">
                      <span className="text-muted-foreground">Total Minutes:</span>
                      <span className="font-bold">{(result.totalDays * 24 * 60).toLocaleString()}</span>
                    </div>
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

export default AgeCalculator;
