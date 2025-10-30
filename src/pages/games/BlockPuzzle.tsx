import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const BlockPuzzle = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(8).fill(0).map(() => Array(8).fill(false))
  );
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
    checkLines(newGrid);
  };

  const checkLines = (g: boolean[][]) => {
    let cleared = 0;
    const newGrid = g.map(r => [...r]);

    for (let i = 0; i < 8; i++) {
      if (newGrid[i].every(cell => cell)) {
        newGrid[i] = Array(8).fill(false);
        cleared++;
      }
    }

    if (cleared > 0) {
      setGrid(newGrid);
      setScore(s => s + cleared * 10);
      toast({ title: `${cleared} line(s) cleared!`, description: `+${cleared * 10} points` });
    }
  };

  const reset = () => {
    setGrid(Array(8).fill(0).map(() => Array(8).fill(false)));
    setScore(0);
  };

  return (
    <GameLayout
      title="Block Puzzle"
      description="Fit tetris-like blocks to clear lines and score."
      keywords={["block puzzle", "tetris", "tile game", "strategy"]}
      difficulty="medium"
      category="puzzle"
      gameId="block-puzzle"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <h2 className="text-3xl font-bold">Score: {score}</h2>

        <div className="grid grid-cols-8 gap-1 bg-border p-2 rounded-lg">
          {grid.map((row, i) =>
            row.map((filled, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => toggleCell(i, j)}
                className={`w-10 h-10 rounded cursor-pointer transition-colors ${
                  filled ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                }`}
              />
            ))
          )}
        </div>

        <div className="flex gap-4">
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>
        <p className="text-sm text-muted-foreground">Click cells to fill. Complete rows to clear!</p>
      </div>
    </GameLayout>
  );
};

export default BlockPuzzle;
