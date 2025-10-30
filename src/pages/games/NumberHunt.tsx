import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const NumberHunt = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [target, setTarget] = useState(1);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setTime(t => t + 0.1), 100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const startGame = () => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setNumbers(nums);
    setTarget(1);
    setTime(0);
    setIsPlaying(true);
  };

  const handleClick = (num: number) => {
    if (num === target) {
      if (target === 25) {
        setIsPlaying(false);
        toast({ title: "Completed!", description: `Time: ${time.toFixed(1)}s` });
      } else {
        setTarget(t => t + 1);
      }
    }
  };

  return (
    <GameLayout
      title="Number Hunt"
      description="Find numbers in sequence as fast as possible!"
      keywords={["number game", "speed game", "sequence", "hunt"]}
      difficulty="medium"
      category="arcade"
      gameId="number-hunt"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <p className="text-lg">Find: <span className="text-4xl font-bold text-primary">{target}</span></p>
          <p className="text-xl">Time: {time.toFixed(1)}s</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Hunt</Button>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {numbers.map((num, i) => (
              <button
                key={i}
                onClick={() => handleClick(num)}
                className={`w-16 h-16 rounded-lg text-xl font-bold transition-all ${
                  num < target
                    ? "bg-green-500/30 text-muted-foreground"
                    : "bg-secondary hover:bg-primary hover:text-primary-foreground"
                }`}
                disabled={num < target}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default NumberHunt;
