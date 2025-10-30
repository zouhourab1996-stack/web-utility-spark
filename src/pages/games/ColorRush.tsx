import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const colors = [
  { name: "Red", bg: "bg-red-500" },
  { name: "Blue", bg: "bg-blue-500" },
  { name: "Green", bg: "bg-green-500" },
  { name: "Yellow", bg: "bg-yellow-500" }
];

const ColorRush = () => {
  const [target, setTarget] = useState(colors[0]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying || time <= 0) return;
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isPlaying, time]);

  useEffect(() => {
    if (time === 0) {
      setIsPlaying(false);
      toast({ title: "Time's Up!", description: `Final Score: ${score}` });
    }
  }, [time, score, toast]);

  const startGame = () => {
    setScore(0);
    setTime(30);
    setIsPlaying(true);
    nextColor();
  };

  const nextColor = () => {
    setTarget(colors[Math.floor(Math.random() * colors.length)]);
  };

  const handleClick = (color: typeof colors[0]) => {
    if (color.name === target.name) {
      setScore(s => s + 1);
      nextColor();
    } else {
      setScore(s => Math.max(0, s - 1));
      toast({ title: "Wrong!", description: "Try again", variant: "destructive" });
    }
  };

  return (
    <GameLayout
      title="Color Rush"
      description="Click the matching color before time runs out!"
      keywords={["color game", "reaction game", "speed game", "quick match"]}
      difficulty="easy"
      category="arcade"
      gameId="color-rush"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Score: {score}</h2>
          <p className="text-xl">Time: {time}s</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <>
            <div className="p-8 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Click:</p>
              <h3 className="text-5xl font-bold">{target.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => handleClick(color)}
                  className={`w-32 h-32 ${color.bg} rounded-lg hover:scale-110 transition-transform`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </GameLayout>
  );
};

export default ColorRush;
