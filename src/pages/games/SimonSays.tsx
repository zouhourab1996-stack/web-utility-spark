import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const colors = ["red", "blue", "green", "yellow"];

const SimonSays = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const startGame = () => {
    const first = colors[Math.floor(Math.random() * colors.length)];
    setSequence([first]);
    setUserSequence([]);
    setScore(0);
    setIsPlaying(true);
    showSequence([first]);
  };

  const showSequence = async (seq: string[]) => {
    setIsShowingSequence(true);
    for (const color of seq) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveColor(color);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(null);
    }
    setIsShowingSequence(false);
  };

  const handleColorClick = (color: string) => {
    if (isShowingSequence || !isPlaying) return;

    const newUserSeq = [...userSequence, color];
    setUserSequence(newUserSeq);

    if (color !== sequence[newUserSeq.length - 1]) {
      setIsPlaying(false);
      toast({ title: "Wrong!", description: `Final Score: ${score}`, variant: "destructive" });
      return;
    }

    if (newUserSeq.length === sequence.length) {
      setScore(s => s + 1);
      const nextColor = colors[Math.floor(Math.random() * colors.length)];
      const nextSeq = [...sequence, nextColor];
      setSequence(nextSeq);
      setUserSequence([]);
      setTimeout(() => showSequence(nextSeq), 1000);
    }
  };

  const getColorClass = (color: string) => {
    const base = "w-32 h-32 rounded-lg transition-all cursor-pointer ";
    const active = activeColor === color ? "scale-110 brightness-150" : "";
    const colorMap = {
      red: "bg-red-500 hover:bg-red-600",
      blue: "bg-blue-500 hover:bg-blue-600",
      green: "bg-green-500 hover:bg-green-600",
      yellow: "bg-yellow-500 hover:bg-yellow-600"
    };
    return base + colorMap[color as keyof typeof colorMap] + " " + active;
  };

  return (
    <GameLayout
      title="Simon Says"
      description="Repeat the pattern by clicking the colored buttons."
      keywords={["simon says", "pattern memory", "sequence", "colors"]}
      difficulty="hard"
      category="memory"
      gameId="simon-says"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Level: {score}</h2>
          <p className="text-lg text-muted-foreground">
            {isShowingSequence ? "Watch..." : isPlaying ? "Your turn!" : ""}
          </p>
        </div>

        {!isPlaying ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className={getColorClass(color)}
                disabled={isShowingSequence}
              />
            ))}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default SimonSays;
