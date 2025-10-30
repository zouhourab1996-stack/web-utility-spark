import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const puzzles = [
  { board: "♔ vs ♚ ♜", solution: "Checkmate with Rook", difficulty: "Easy" },
  { board: "♕ ♗ vs ♚", solution: "Checkmate with Queen + Bishop", difficulty: "Medium" },
  { board: "♖ ♘ vs ♚ ♟", solution: "Fork with Knight", difficulty: "Medium" }
];

const ChessPuzzles = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const solvePuzzle = () => {
    setScore(s => s + 10);
    toast({ title: "Puzzle solved!", description: "+10 points" });
    if (current < puzzles.length - 1) {
      setCurrent(c => c + 1);
    } else {
      toast({ title: "All puzzles complete!", description: `Final score: ${score + 10}` });
    }
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
  };

  return (
    <GameLayout
      title="Chess Puzzles"
      description="Solve chess puzzles and checkmate in one move!"
      keywords={["chess", "puzzles", "checkmate", "strategy"]}
      difficulty="hard"
      category="strategy"
      gameId="chess-puzzles"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Puzzle {current + 1}/{puzzles.length}</h2>
          <p className="text-xl">Score: {score}</p>
          <p className="text-sm text-muted-foreground">{puzzles[current].difficulty}</p>
        </div>

        <div className="p-12 bg-secondary rounded-lg text-center">
          <p className="text-6xl mb-6">{puzzles[current].board}</p>
          <p className="text-lg font-semibold">{puzzles[current].solution}</p>
        </div>

        <div className="flex gap-4">
          <Button onClick={solvePuzzle}>Solve</Button>
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>

        <p className="text-sm text-muted-foreground text-center max-w-md">
          Find the best move to checkmate or gain advantage
        </p>
      </div>
    </GameLayout>
  );
};

export default ChessPuzzles;
