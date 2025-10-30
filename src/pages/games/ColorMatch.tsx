import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];
const colorNames = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink"];

const ColorMatch = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setSequence([Math.floor(Math.random() * colors.length)]);
    setUserSequence([]);
    setLevel(1);
    setScore(0);
    setIsPlaying(true);
    setIsShowingSequence(true);
  };

  const nextLevel = () => {
    const newSequence = [...sequence, Math.floor(Math.random() * colors.length)];
    setSequence(newSequence);
    setUserSequence([]);
    setLevel(level + 1);
    setIsShowingSequence(true);
  };

  useEffect(() => {
    if (isShowingSequence && sequence.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < sequence.length) {
          // Flash color
          const colorIndex = sequence[index];
          const element = document.getElementById(`color-${colorIndex}`);
          if (element) {
            element.classList.add("ring-4", "ring-white", "scale-110");
            setTimeout(() => {
              element.classList.remove("ring-4", "ring-white", "scale-110");
            }, 500);
          }
          index++;
        } else {
          setIsShowingSequence(false);
          clearInterval(interval);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isShowingSequence, sequence]);

  const handleColorClick = (colorIndex: number) => {
    if (isShowingSequence || !isPlaying) return;

    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    if (colorIndex !== sequence[newUserSequence.length - 1]) {
      toast.error(`Game Over! Final Score: ${score}`);
      setIsPlaying(false);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      const newScore = score + level * 10;
      setScore(newScore);
      toast.success(`Level ${level} Complete! +${level * 10} points`);
      setTimeout(() => nextLevel(), 1000);
    }
  };

  return (
    <GameLayout
      title="Color Match"
      description="Match colors in sequence. Test your memory and speed."
      keywords={["color matching", "memory game", "pattern recognition", "sequence game"]}
      difficulty="easy"
      category="puzzle"
      gameId="color-match"
    >
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-lg font-semibold">
              Level: <span className="text-primary">{level}</span>
            </div>
            <div className="text-lg font-semibold">
              Score: <span className="text-primary">{score}</span>
            </div>
          </div>
          {!isPlaying ? (
            <Button onClick={startGame} size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          ) : (
            <Button onClick={startGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
          )}
        </div>

        {isPlaying && isShowingSequence && (
          <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6 text-center">
            <p className="font-semibold text-blue-800 dark:text-blue-300">
              Watch the sequence...
            </p>
          </div>
        )}

        {isPlaying && !isShowingSequence && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg p-4 mb-6 text-center">
            <p className="font-semibold text-green-800 dark:text-green-300">
              Repeat the sequence ({userSequence.length}/{sequence.length})
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 p-6 bg-secondary/30 rounded-lg">
          {colors.map((color, index) => (
            <button
              key={index}
              id={`color-${index}`}
              onClick={() => handleColorClick(index)}
              disabled={isShowingSequence || !isPlaying}
              className={`aspect-square rounded-lg ${color} transition-all hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            />
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Watch the sequence of colors, then repeat it by clicking the colors in the same order.</p>
          <p className="mt-2">The sequence gets longer with each level!</p>
        </div>
      </div>
    </GameLayout>
  );
};

export default ColorMatch;
