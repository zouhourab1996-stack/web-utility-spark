import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const HolidayPlanner = () => {
  const [country, setCountry] = useState<string>("US");
  const seoConfig = seoConfigs["/holiday-planner"];

  const holidays2024: Record<string, Array<{ date: string; name: string }>> = {
    US: [
      { date: "2024-01-01", name: "New Year's Day" },
      { date: "2024-01-15", name: "Martin Luther King Jr. Day" },
      { date: "2024-02-19", name: "Presidents' Day" },
      { date: "2024-05-27", name: "Memorial Day" },
      { date: "2024-07-04", name: "Independence Day" },
      { date: "2024-09-02", name: "Labor Day" },
      { date: "2024-10-14", name: "Columbus Day" },
      { date: "2024-11-11", name: "Veterans Day" },
      { date: "2024-11-28", name: "Thanksgiving Day" },
      { date: "2024-12-25", name: "Christmas Day" },
    ],
    UK: [
      { date: "2024-01-01", name: "New Year's Day" },
      { date: "2024-03-29", name: "Good Friday" },
      { date: "2024-04-01", name: "Easter Monday" },
      { date: "2024-05-06", name: "Early May Bank Holiday" },
      { date: "2024-05-27", name: "Spring Bank Holiday" },
      { date: "2024-08-26", name: "Summer Bank Holiday" },
      { date: "2024-12-25", name: "Christmas Day" },
      { date: "2024-12-26", name: "Boxing Day" },
    ],
    Canada: [
      { date: "2024-01-01", name: "New Year's Day" },
      { date: "2024-02-19", name: "Family Day" },
      { date: "2024-03-29", name: "Good Friday" },
      { date: "2024-05-20", name: "Victoria Day" },
      { date: "2024-07-01", name: "Canada Day" },
      { date: "2024-09-02", name: "Labour Day" },
      { date: "2024-10-14", name: "Thanksgiving" },
      { date: "2024-12-25", name: "Christmas Day" },
      { date: "2024-12-26", name: "Boxing Day" },
    ],
  };

  const getNextHoliday = () => {
    const today = new Date();
    const countryHolidays = holidays2024[country] || [];
    
    for (const holiday of countryHolidays) {
      const holidayDate = new Date(holiday.date);
      if (holidayDate >= today) {
        const diffTime = holidayDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...holiday, daysUntil: diffDays };
      }
    }
    return null;
  };

  const nextHoliday = getNextHoliday();

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Holiday & Vacation Planner</h1>
          <p className="text-lg text-muted-foreground">
            Find the next public holiday in your country
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Country</CardTitle>
            <CardDescription>Choose your country to see upcoming holidays</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {nextHoliday && (
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle>Next Holiday</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-primary">{nextHoliday.name}</h2>
                <p className="text-xl">{nextHoliday.date}</p>
                <div className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold">
                  {nextHoliday.daysUntil} days away
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>All {country} Holidays 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {holidays2024[country]?.map((holiday, index) => (
                <div key={index} className="flex justify-between p-3 bg-secondary rounded">
                  <span className="font-medium">{holiday.name}</span>
                  <span className="text-muted-foreground">{holiday.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default HolidayPlanner;
