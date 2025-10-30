import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const SpaceDodger = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shipY, setShipY] = useState(50);
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        const newObs = prev.map(o => ({ ...o, x: o.x - 3 })).filter(o => o.x > 0);
        
        if (Math.random() < 0.03) {
          newObs.push({ x: 100, y: Math.random() * 80 + 10 });
        }

        newObs.forEach(obs => {
          if (obs.x < 20 && obs.x > 10 && Math.abs(obs.y - shipY) < 8) {
            setIsPlaying(false);
            toast({ title: "Game Over!", description: `Score: ${score}` });
          }
        });

        return newObs;
      });

      setScore(s => s + 1);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isPlaying, shipY, score, toast]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const handleMove = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setShipY(y => Math.max(10, y - 5));
      if (e.key === "ArrowDown") setShipY(y => Math.min(90, y + 5));
    };

    window.addEventListener("keydown", handleMove);
    return () => window.removeEventListener("keydown", handleMove);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setObstacles([]);
    setShipY(50);
  };

  return (
    <GameLayout
      title="Space Dodger"
      description="Navigate your spaceship and avoid asteroids!"
      keywords={["space game", "dodging game", "arcade", "reflex"]}
      difficulty="hard"
      category="arcade"
      gameId="space-dodger"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-3xl font-bold">Score: {score}</h2>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Launch 🚀</Button>
        ) : (
          <div className="relative w-full max-w-2xl h-96 bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg overflow-hidden">
            <Rocket
              className="absolute left-8 w-8 h-8 text-white transition-all"
              style={{ top: `${shipY}%`, transform: "translateY(-50%) rotate(90deg)" }}
            />
            {obstacles.map((obs, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 bg-red-500 rounded-full"
                style={{ left: `${obs.x}%`, top: `${obs.y}%` }}
              />
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground">Use Arrow Keys to Move</p>
      </div>
    </GameLayout>
  );
};

export default SpaceDodger;
