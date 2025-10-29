import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";
import SEO from "@/components/SEO";
import { seoConfigs } from "@/config/seo";

const MeetingTimeFinder = () => {
  const [time, setTime] = useState<string>("14:00");
  const [timezone1, setTimezone1] = useState<string>("America/New_York");
  const [timezone2, setTimezone2] = useState<string>("Europe/London");
  const [timezone3, setTimezone3] = useState<string>("Asia/Tokyo");
  const seoConfig = seoConfigs["/meeting-time-finder"];

  const timezones = [
    { value: "America/New_York", label: "New York (EST/EDT)" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)" },
    { value: "America/Chicago", label: "Chicago (CST/CDT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)" },
    { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)" },
  ];

  const convertTime = (baseTime: string, targetTimezone: string) => {
    try {
      const [hours, minutes] = baseTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      
      return date.toLocaleTimeString('en-US', {
        timeZone: targetTimezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      return "Invalid";
    }
  };

  return (
    <>
      <SEO {...seoConfig} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Meeting Time Finder</h1>
          <p className="text-lg text-muted-foreground">
            Find the best meeting time across multiple time zones
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Base Time</CardTitle>
            <CardDescription>Select your local time for the meeting</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Timezone 1</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={timezone1} onValueChange={setTimezone1}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {convertTime(time, timezone1)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone 2</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={timezone2} onValueChange={setTimezone2}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {convertTime(time, timezone2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timezone 3</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={timezone3} onValueChange={setTimezone3}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-3xl font-bold text-primary">
                  {convertTime(time, timezone3)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MeetingTimeFinder;
