import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const arrows = [
  { key: "ArrowUp", icon: ArrowUp, name: "↑" },
  { key: "ArrowDown", icon: ArrowDown, name: "↓" },
  { key: "ArrowLeft", icon: ArrowLeft, name: "←" },
  { key: "ArrowRight", icon: ArrowRight, name: "→" }
];

const ArrowKeys = () => {
  const [current, setCurrent] = useState(arrows[0]);
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
      toast({ title: "Time's Up!", description: `Score: ${score}` });
    }
  }, [time, score, toast]);

  useEffect(() => {
    if (!isPlaying) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === current.key) {
        setScore(s => s + 1);
        nextArrow();
      } else if (arrows.some(a => a.key === e.key)) {
        setScore(s => Math.max(0, s - 1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying, current]);

  const startGame = () => {
    setScore(0);
    setTime(30);
    setIsPlaying(true);
    nextArrow();
  };

  const nextArrow = () => {
    setCurrent(arrows[Math.floor(Math.random() * arrows.length)]);
  };

  return (
    <GameLayout
      title="Arrow Keys Master"
      description="Press the correct arrow key as fast as you can!"
      keywords={["arrow game", "keyboard game", "reaction", "keys"]}
      difficulty="easy"
      category="arcade"
      gameId="arrow-keys"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Score: {score}</h2>
          <p className="text-xl">Time: {time}s</p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <div className="p-16 bg-secondary rounded-lg">
            <current.icon className="w-32 h-32 animate-pulse" />
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default ArrowKeys;
