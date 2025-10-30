import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const generatePuzzle = () => {
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3]
  ];
  
  const puzzle = solution.map(row => [...row]);
  const cellsToRemove = 8;
  
  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    puzzle[row][col] = 0;
  }
  
  return { puzzle, solution };
};

const Sudoku = () => {
  const [{ puzzle, solution }, setGame] = useState(generatePuzzle());
  const [board, setBoard] = useState(puzzle);
  const { toast } = useToast();

  const handleChange = (row: number, col: number, value: string) => {
    if (puzzle[row][col] !== 0) return;
    
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value === "" ? 0 : parseInt(value);
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const correct = JSON.stringify(board) === JSON.stringify(solution);
    toast({
      title: correct ? "Solved!" : "Not quite right",
      description: correct ? "Great job!" : "Keep trying",
      variant: correct ? "default" : "destructive"
    });
  };

  const newGame = () => {
    const game = generatePuzzle();
    setGame(game);
    setBoard(game.puzzle);
  };

  return (
    <GameLayout
      title="Mini Sudoku"
      description="4x4 Sudoku puzzle. Fill the grid with numbers 1-4."
      keywords={["sudoku", "logic puzzle", "number puzzle", "brain teaser"]}
      difficulty="medium"
      category="puzzle"
      gameId="sudoku"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="grid grid-cols-4 gap-1 bg-border p-2 rounded-lg">
          {board.map((row, i) => 
            row.map((cell, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                min="1"
                max="4"
                value={cell || ""}
                onChange={(e) => handleChange(i, j, e.target.value)}
                disabled={puzzle[i][j] !== 0}
                className={`w-16 h-16 text-center text-2xl font-bold rounded ${
                  puzzle[i][j] !== 0 
                    ? "bg-secondary text-foreground cursor-not-allowed" 
                    : "bg-background"
                }`}
              />
            ))
          )}
        </div>
        
        <div className="flex gap-4">
          <Button onClick={checkSolution}>Check Solution</Button>
          <Button onClick={newGame} variant="outline">New Game</Button>
        </div>
      </div>
    </GameLayout>
  );
};

export default Sudoku;
