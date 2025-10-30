import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const MathPyramid = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const pyramid = [
    [1, 2, 3],
    [3, 5],
    [8]
  ];

  const checkAnswer = () => {
    setScore(s => s + level * 10);
    setLevel(l => l + 1);
    toast({ title: "Correct!", description: `+${level * 10} points` });
  };

  return (
    <GameLayout
      title="Math Pyramid"
      description="Solve the pyramid by calculating missing numbers."
      keywords={["math game", "arithmetic", "number puzzle", "logic"]}
      difficulty="hard"
      category="puzzle"
      gameId="math-pyramid"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Level {level}</h2>
          <p className="text-xl">Score: {score}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {pyramid.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((num, j) => (
                <div key={j} className="w-16 h-16 flex items-center justify-center bg-secondary rounded-lg text-2xl font-bold">
                  {num}
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-md">
          Each cell is the sum of the two cells below it. Can you find the pattern?
        </p>

        <Button onClick={checkAnswer} size="lg">Submit Answer</Button>
      </div>
    </GameLayout>
  );
};

export default MathPyramid;
