import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const ConnectDots = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
  const [grid] = useState(
    Array(6).fill(0).map(() => 
      Array(6).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)])
    )
  );

  const completeLevel = () => {
    setScore(s => s + level * 10);
    setLevel(l => l + 1);
    toast({ title: "Level Complete!", description: `+${level * 10} points` });
  };

  return (
    <GameLayout
      title="Connect the Dots"
      description="Connect matching colored dots without crossing lines."
      keywords={["connect game", "logic puzzle", "path puzzle"]}
      difficulty="medium"
      category="puzzle"
      gameId="connect-dots"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Level {level}</h2>
          <p className="text-xl">Score: {score}</p>
        </div>

        <div className="grid grid-cols-6 gap-2 p-4 bg-secondary rounded-lg">
          {grid.map((row, i) =>
            row.map((color, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-12 h-12 rounded-full ${color} cursor-pointer hover:scale-110 transition-transform`}
              />
            ))
          )}
        </div>

        <Button onClick={completeLevel} size="lg">Complete Level</Button>
        <p className="text-sm text-muted-foreground">Click dots of same color to connect</p>
      </div>
    </GameLayout>
  );
};

export default ConnectDots;
