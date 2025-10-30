import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const VisualMemory = () => {
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState<boolean[][]>(Array(4).fill(0).map(() => Array(4).fill(false)));
  const [pattern, setPattern] = useState<boolean[][]>([]);
  const [isShowing, setIsShowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const startLevel = () => {
    const newGrid = Array(4).fill(0).map(() => Array(4).fill(false));
    const cells = level + 2;
    
    for (let i = 0; i < cells; i++) {
      let row, col;
      do {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
      } while (newGrid[row][col]);
      newGrid[row][col] = true;
    }

    setPattern(newGrid);
    setGrid(Array(4).fill(0).map(() => Array(4).fill(false)));
    setIsShowing(true);
    setIsPlaying(true);

    setTimeout(() => setIsShowing(false), 2000);
  };

  const toggleCell = (row: number, col: number) => {
    if (isShowing) return;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const checkAnswer = () => {
    const correct = JSON.stringify(grid) === JSON.stringify(pattern);
    if (correct) {
      setLevel(l => l + 1);
      toast({ title: "Correct!", description: `Level ${level + 1}` });
      setTimeout(startLevel, 1000);
    } else {
      setIsPlaying(false);
      toast({ title: "Wrong!", description: `Made it to level ${level}`, variant: "destructive" });
    }
  };

  const displayGrid = isShowing ? pattern : grid;

  return (
    <GameLayout
      title="Visual Memory"
      description="Remember the positions of highlighted squares."
      keywords={["visual memory", "spatial memory", "grid", "recall"]}
      difficulty="hard"
      category="memory"
      gameId="visual-memory"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Level: {level}</h2>
          <p className="text-lg text-muted-foreground">
            {isShowing ? "Memorize!" : isPlaying ? "Recall!" : ""}
          </p>
        </div>

        {!isPlaying ? (
          <Button onClick={startLevel} size="lg">Start Test</Button>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-2 bg-border p-2 rounded-lg">
              {displayGrid.map((row, i) =>
                row.map((cell, j) => (
                  <button
                    key={`${i}-${j}`}
                    onClick={() => toggleCell(i, j)}
                    disabled={isShowing}
                    className={`w-20 h-20 rounded transition-colors ${
                      cell ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                ))
              )}
            </div>

            {!isShowing && (
              <Button onClick={checkAnswer} size="lg">Submit</Button>
            )}
          </>
        )}
      </div>
    </GameLayout>
  );
};

export default VisualMemory;
