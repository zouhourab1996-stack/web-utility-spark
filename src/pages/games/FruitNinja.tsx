import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const fruits = ["🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓"];
const bomb = "💣";

const FruitNinja = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [items, setItems] = useState<{ emoji: string; x: number; y: number; id: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isPlaying || lives <= 0) return;

    const spawnInterval = setInterval(() => {
      const isBomb = Math.random() < 0.2;
      const emoji = isBomb ? bomb : fruits[Math.floor(Math.random() * fruits.length)];
      
      setItems(prev => [...prev, {
        emoji,
        x: Math.random() * 80 + 10,
        y: 100,
        id: Date.now() + Math.random()
      }]);
    }, 1000);

    const moveInterval = setInterval(() => {
      setItems(prev => {
        const moved = prev.map(item => ({ ...item, y: item.y - 2 }));
        return moved.filter(item => item.y > 0);
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [isPlaying, lives]);

  useEffect(() => {
    if (lives === 0) {
      setIsPlaying(false);
      toast({ title: "Game Over!", description: `Final Score: ${score}` });
    }
  }, [lives, score, toast]);

  const slice = (item: typeof items[0]) => {
    if (item.emoji === bomb) {
      setLives(l => l - 1);
      toast({ title: "Bomb!", description: "Lost a life", variant: "destructive" });
    } else {
      setScore(s => s + 1);
    }
    setItems(prev => prev.filter(i => i.id !== item.id));
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setIsPlaying(true);
    setItems([]);
  };

  return (
    <GameLayout
      title="Fruit Slicer"
      description="Slice the fruits and avoid the bombs!"
      keywords={["fruit game", "slicing game", "clicking game", "arcade"]}
      difficulty="medium"
      category="arcade"
      gameId="fruit-ninja"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="flex gap-8">
          <p className="text-2xl font-bold">Score: {score}</p>
          <p className="text-2xl font-bold">Lives: {"❤️".repeat(lives)}</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Slicing</Button>
        ) : (
          <div className="relative w-full max-w-2xl h-96 bg-gradient-to-b from-sky-300 to-green-300 rounded-lg overflow-hidden">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => slice(item)}
                className="absolute text-6xl cursor-pointer hover:scale-125 transition-transform"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default FruitNinja;
