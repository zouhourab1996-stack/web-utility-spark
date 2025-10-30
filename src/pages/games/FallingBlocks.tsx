import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const FallingBlocks = () => {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(50);
  const [blocks, setBlocks] = useState<{ x: number; y: number; isBomb: boolean }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setBlocks(prev => {
        const newBlocks = prev.map(b => ({ ...b, y: b.y + 5 })).filter(b => b.y < 100);
        
        if (Math.random() < 0.3) {
          newBlocks.push({
            x: Math.random() * 90,
            y: 0,
            isBomb: Math.random() < 0.2
          });
        }

        newBlocks.forEach(block => {
          if (Math.abs(block.x - position) < 8 && block.y > 85 && block.y < 95) {
            if (block.isBomb) {
              setIsPlaying(false);
              toast({ title: "Game Over!", description: `Final Score: ${score}` });
            } else {
              setScore(s => s + 1);
            }
            block.y = 100;
          }
        });

        return newBlocks;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isPlaying, position, score, toast]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const handleMove = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setPosition(p => Math.max(5, p - 5));
      if (e.key === "ArrowRight") setPosition(p => Math.min(95, p + 5));
    };

    window.addEventListener("keydown", handleMove);
    return () => window.removeEventListener("keydown", handleMove);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setBlocks([]);
    setPosition(50);
  };

  return (
    <GameLayout
      title="Falling Blocks"
      description="Catch the falling blocks and avoid the bombs!"
      keywords={["falling game", "catch game", "reflex game", "arcade"]}
      difficulty="medium"
      category="arcade"
      gameId="falling-blocks"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-3xl font-bold">Score: {score}</h2>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <div className="relative w-full max-w-md h-96 bg-secondary rounded-lg overflow-hidden">
            {blocks.map((block, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 rounded ${block.isBomb ? "bg-red-500" : "bg-primary"}`}
                style={{ left: `${block.x}%`, top: `${block.y}%` }}
              />
            ))}
            <div
              className="absolute bottom-4 w-16 h-4 bg-green-500 rounded transition-all"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />
          </div>
        )}

        <p className="text-sm text-muted-foreground">Use Arrow Keys to Move</p>
      </div>
    </GameLayout>
  );
};

export default FallingBlocks;
