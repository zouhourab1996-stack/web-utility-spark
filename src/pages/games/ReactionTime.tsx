import { useState, useEffect, useRef } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const ReactionTime = () => {
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "clicked">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    
    const delay = 2000 + Math.random() * 3000; // Random delay between 2-5 seconds
    
    timeoutRef.current = window.setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("idle");
      toast.error("Too early! Wait for the green screen.");
      return;
    }

    if (gameState === "ready") {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState("clicked");
      
      const newAttempts = [...attempts, time];
      setAttempts(newAttempts);
      
      if (!bestTime || time < bestTime) {
        setBestTime(time);
        toast.success(`New best time: ${time}ms!`);
      }
    }
  };

  const reset = () => {
    setGameState("idle");
    setReactionTime(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const averageTime = attempts.length > 0
    ? Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length)
    : null;

  return (
    <GameLayout
      title="Reaction Time Test"
      description="Test your reflexes. Click as fast as you can!"
      keywords={["reaction test", "reflex game", "speed test", "quick game", "reaction time"]}
      difficulty="easy"
      category="arcade"
      gameId="reaction-time"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Last Time</div>
            <div className="text-2xl font-bold text-primary">
              {reactionTime ? `${reactionTime}ms` : "-"}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Best Time</div>
            <div className="text-2xl font-bold text-green-600">
              {bestTime ? `${bestTime}ms` : "-"}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Average</div>
            <div className="text-2xl font-bold text-blue-600">
              {averageTime ? `${averageTime}ms` : "-"}
            </div>
          </div>
        </div>

        <div
          onClick={handleClick}
          className={`relative h-96 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
            gameState === "idle"
              ? "bg-blue-500 hover:bg-blue-600"
              : gameState === "waiting"
              ? "bg-red-500"
              : gameState === "ready"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        >
          <div className="text-white text-center p-8">
            {gameState === "idle" && (
              <>
                <div className="text-4xl font-bold mb-4">Click to Start</div>
                <div className="text-xl">Test your reaction time!</div>
              </>
            )}
            {gameState === "waiting" && (
              <>
                <div className="text-4xl font-bold mb-4">Wait...</div>
                <div className="text-xl">Get ready for the green screen</div>
              </>
            )}
            {gameState === "ready" && (
              <>
                <div className="text-4xl font-bold mb-4 animate-pulse">Click Now!</div>
                <div className="text-xl">As fast as you can!</div>
              </>
            )}
            {gameState === "clicked" && (
              <>
                <div className="text-6xl font-bold mb-4">{reactionTime}ms</div>
                <div className="text-xl mb-6">
                  {reactionTime! < 200
                    ? "🚀 Lightning fast!"
                    : reactionTime! < 300
                    ? "⚡ Great reflexes!"
                    : reactionTime! < 400
                    ? "👍 Good reaction!"
                    : "🐌 Keep practicing!"}
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={(e) => { e.stopPropagation(); startGame(); }} variant="secondary">
                    <Play className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button onClick={(e) => { e.stopPropagation(); reset(); }} variant="outline" className="bg-white/20">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {attempts.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Your Attempts ({attempts.length})</h3>
            <div className="flex flex-wrap gap-2">
              {attempts.map((time, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    time === bestTime
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {time}ms
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Wait for the screen to turn green, then click as fast as possible!</p>
          <p className="mt-2">Average human reaction time is around 250ms.</p>
        </div>
      </div>
    </GameLayout>
  );
};

export default ReactionTime;
