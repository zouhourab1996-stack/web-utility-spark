import { useState, useEffect } from "react";
import GameLayout from "@/components/GameLayout";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";

const NumberSlide = () => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = () => {
    const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
    numbers.push(0); // 0 represents empty space
    
    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    setTiles(numbers);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const checkWin = (currentTiles: number[]) => {
    for (let i = 0; i < 15; i++) {
      if (currentTiles[i] !== i + 1) return false;
    }
    return currentTiles[15] === 0;
  };

  const moveTile = (index: number) => {
    if (isWon) return;
    
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 4, emptyIndex + 4];
    
    // Check if move is valid (adjacent to empty space)
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(moves + 1);
      
      if (checkWin(newTiles)) {
        setIsWon(true);
        toast.success(`Congratulations! You won in ${moves + 1} moves!`);
      }
    }
  };

  return (
    <GameLayout
      title="Number Slide Puzzle"
      description="Classic sliding number puzzle. Arrange numbers 1-15 in order."
      keywords={["sliding puzzle", "number game", "logic puzzle", "brain teaser", "15 puzzle"]}
      difficulty="medium"
      category="puzzle"
      gameId="number-slide"
    >
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">
            Moves: <span className="text-primary">{moves}</span>
          </div>
          <Button onClick={initializeGame} variant="outline">
            <Shuffle className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>

        {isWon && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-500 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg font-semibold text-green-800 dark:text-green-300">
              🎉 You Won in {moves} Moves!
            </p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 bg-secondary/30 p-4 rounded-lg">
          {tiles.map((tile, index) => (
            <button
              key={index}
              onClick={() => moveTile(index)}
              disabled={tile === 0}
              className={`aspect-square rounded-lg text-2xl font-bold transition-all ${
                tile === 0
                  ? "bg-transparent cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-md"
              }`}
            >
              {tile !== 0 && tile}
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          <p>Click tiles adjacent to the empty space to slide them.</p>
          <p>Goal: Arrange numbers 1-15 in order with empty space at bottom right.</p>
        </div>
      </div>
    </GameLayout>
  );
};

export default NumberSlide;
