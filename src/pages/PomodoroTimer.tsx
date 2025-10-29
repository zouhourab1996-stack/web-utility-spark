import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Timer, Play, Pause, RotateCcw } from "lucide-react";
import SEO from "@/components/SEO";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      if (isWorkSession) {
        setCompletedSessions(prev => prev + 1);
        setTimeLeft(breakMinutes * 60);
        setIsWorkSession(false);
      } else {
        setTimeLeft(workMinutes * 60);
        setIsWorkSession(true);
      }
      setIsActive(false);
      
      // Play notification sound (browser built-in)
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZRw0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9cFA5FnuDyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn7a9c');
      audio.play().catch(() => {});
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, workMinutes, breakMinutes, isWorkSession]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(workMinutes * 60);
    setIsWorkSession(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pomodoro Timer",
    "description": "Free Pomodoro timer for productivity, focus timer with work and break intervals",
    "url": "https://zouhourab1996-stack.github.io/web-utility-spark/#/pomodoro-timer",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any"
  };

  return (
    <>
      <SEO
        title="Pomodoro Timer — Free Focus Timer for Productivity"
        description="Free Pomodoro timer online. Boost productivity with the Pomodoro Technique - 25-minute work sessions with short breaks."
        keywords="pomodoro timer, focus timer, productivity timer, work timer, study timer, time management, pomodoro technique, online tools"
        canonical="/#/pomodoro-timer"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Timer className="w-10 h-10 mr-3 text-primary" />
              Pomodoro Timer
            </h1>
            <p className="text-lg text-muted-foreground">
              Boost your productivity with focused work sessions
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {isWorkSession ? "Work Session" : "Break Time"}
              </CardTitle>
              <CardDescription>
                {isWorkSession 
                  ? "Focus on your task for the set duration"
                  : "Take a break and recharge"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className="text-8xl font-bold text-primary mb-4">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-lg text-muted-foreground">
                  Sessions completed: {completedSessions}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className="gradient-primary text-white w-32"
                >
                  {isActive ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetTimer}
                  size="lg"
                  variant="outline"
                  className="w-32"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t">
                <div className="space-y-2">
                  <Label htmlFor="work">Work Duration (minutes)</Label>
                  <Input
                    id="work"
                    type="number"
                    value={workMinutes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 25;
                      setWorkMinutes(val);
                      if (isWorkSession && !isActive) {
                        setTimeLeft(val * 60);
                      }
                    }}
                    min="1"
                    max="60"
                    disabled={isActive}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="break">Break Duration (minutes)</Label>
                  <Input
                    id="break"
                    type="number"
                    value={breakMinutes}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 5;
                      setBreakMinutes(val);
                      if (!isWorkSession && !isActive) {
                        setTimeLeft(val * 60);
                      }
                    }}
                    min="1"
                    max="30"
                    disabled={isActive}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About the Pomodoro Technique</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This helps maintain focus and prevents burnout.
              </p>
              <p className="mt-4">
                <strong>How to use:</strong>
              </p>
              <ul>
                <li>Set your work duration (default: 25 minutes)</li>
                <li>Work on a single task until the timer rings</li>
                <li>Take a short break (default: 5 minutes)</li>
                <li>Repeat the process</li>
                <li>After 4 sessions, take a longer break (15-30 minutes)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PomodoroTimer;
