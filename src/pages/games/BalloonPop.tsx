import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { toast } from "sonner";

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

const BalloonPop = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setBalloons([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (score > highScore) {
            setHighScore(score);
            toast.success(`New High Score: ${score}!`);
          } else {
            toast.info(`Game Over! Score: ${score}`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, score, highScore]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawnBalloon = () => {
      const newBalloon: Balloon = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 5, // 5-85% from left
        y: Math.random() * 70 + 5, // 5-75% from top
        color: colors[Math.floor(Math.random() * colors.length)],
        popped: false,
      };
      
      setBalloons((prev) => [...prev, newBalloon].slice(-15)); // Keep max 15 balloons
    };

    const interval = setInterval(spawnBalloon, 800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setScore((prev) => prev + 1);
    setTimeout(() => {
      setBalloons((prev) => prev.filter((b) => b.id !== id));
    }, 300);
  };

  return (
    <GameLayout
      title="Balloon Pop"
      description="Pop as many balloons as you can before time runs out!"
      keywords={["clicking game", "balloon game", "target practice", "arcade", "popping game"]}
      difficulty="easy"
      category="arcade"
      gameId="balloon-pop"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-3xl font-bold text-primary">{score}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Time Left</div>
              <div className="text-3xl font-bold text-blue-600">{timeLeft}s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">High Score</div>
              <div className="text-3xl font-bold text-green-600">{highScore}</div>
            </div>
          </div>
          <Button onClick={startGame} size="lg" disabled={isPlaying}>
            <Play className="w-5 h-5 mr-2" />
            {isPlaying ? "Playing..." : "Start Game"}
          </Button>
        </div>

        <div className="relative w-full h-96 bg-gradient-to-b from-sky-200 to-sky-50 dark:from-sky-900/50 dark:to-sky-950/50 rounded-lg border-2 border-border overflow-hidden">
          {!isPlaying && balloons.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎈</div>
                <p className="text-xl font-semibold mb-2">Ready to Pop Some Balloons?</p>
                <p className="text-muted-foreground">Click Start Game to begin!</p>
              </div>
            </div>
          )}

          {balloons.map((balloon) => (
            <button
              key={balloon.id}
              onClick={() => popBalloon(balloon.id)}
              disabled={balloon.popped}
              className={`absolute w-12 h-16 ${balloon.color} rounded-full transition-all duration-300 ${
                balloon.popped
                  ? "scale-0 opacity-0"
                  : "hover:scale-110 animate-bounce"
              }`}
              style={{
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                animationDuration: "2s",
              }}
            >
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-foreground/20" />
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Click the balloons as they appear. The faster you pop them, the higher your score!</p>
          <p className="mt-2">You have 30 seconds to pop as many as possible.</p>
        </div>
      </div>
    </GameLayout>
  );
};

export default BalloonPop;
