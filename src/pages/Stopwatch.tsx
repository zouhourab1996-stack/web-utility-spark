import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const startTimer = () => {
    const totalMs = (timerMinutes * 60 + timerSeconds) * 1000;
    setTime(totalMs);
    setIsRunning(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Stopwatch & Timer</h1>
          <p className="text-lg text-muted-foreground">
            Professional online stopwatch with lap timing and countdown timer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Stopwatch
              </CardTitle>
              <CardDescription>Track time with precision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-6 font-mono">{formatTime(time)}</div>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleStartPause}
                    className="gradient-primary text-white"
                    size="lg"
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleLap} variant="secondary" size="lg" disabled={!isRunning}>
                    Lap
                  </Button>
                </div>
              </div>

              {laps.length > 0 && (
                <div className="mt-6 p-4 bg-secondary rounded-lg max-h-48 overflow-y-auto">
                  <h3 className="font-semibold mb-3">Lap Times</h3>
                  <div className="space-y-2">
                    {laps.map((lap, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>Lap {index + 1}</span>
                        <span className="font-mono">{formatTime(lap)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Countdown Timer
              </CardTitle>
              <CardDescription>Set a countdown timer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Minutes</label>
                    <input
                      type="number"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded-lg bg-secondary border border-border"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Seconds</label>
                    <input
                      type="number"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                      className="w-full p-2 rounded-lg bg-secondary border border-border"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>
                <Button onClick={startTimer} className="w-full gradient-accent text-white">
                  Start Timer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
