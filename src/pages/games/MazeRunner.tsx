import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const generateMaze = () => {
  const maze = Array(8).fill(0).map(() => Array(8).fill(0));
  maze[0][0] = 2; // Start
  maze[7][7] = 3; // End
  
  for (let i = 0; i < 12; i++) {
    const row = Math.floor(Math.random() * 8);
    const col = Math.floor(Math.random() * 8);
    if (maze[row][col] === 0) maze[row][col] = 1;
  }
  
  return maze;
};

const MazeRunner = () => {
  const [maze, setMaze] = useState(generateMaze());
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [moves, setMoves] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newX = pos.x;
      let newY = pos.y;

      if (e.key === "ArrowUp") newY--;
      else if (e.key === "ArrowDown") newY++;
      else if (e.key === "ArrowLeft") newX--;
      else if (e.key === "ArrowRight") newX++;
      else return;

      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && maze[newY][newX] !== 1) {
        setPos({ x: newX, y: newY });
        setMoves(m => m + 1);
        
        if (newX === 7 && newY === 7) {
          toast({ title: "You Won!", description: `Completed in ${moves + 1} moves!` });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pos, moves, maze, toast]);

  const newGame = () => {
    setMaze(generateMaze());
    setPos({ x: 0, y: 0 });
    setMoves(0);
  };

  return (
    <GameLayout
      title="Maze Runner"
      description="Navigate through the maze to reach the goal."
      keywords={["maze game", "path finding", "navigation", "puzzle"]}
      difficulty="easy"
      category="puzzle"
      gameId="maze-runner"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <p className="text-xl">Moves: {moves} | Use Arrow Keys</p>
        
        <div className="grid grid-cols-8 gap-1 bg-border p-2 rounded-lg">
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-12 h-12 rounded ${
                  x === pos.x && y === pos.y
                    ? "bg-primary animate-pulse"
                    : cell === 1
                    ? "bg-destructive"
                    : cell === 2
                    ? "bg-green-500"
                    : cell === 3
                    ? "bg-yellow-500"
                    : "bg-secondary"
                }`}
              />
            ))
          )}
        </div>

        <Button onClick={newGame} size="lg">New Maze</Button>
      </div>
    </GameLayout>
  );
};

export default MazeRunner;
