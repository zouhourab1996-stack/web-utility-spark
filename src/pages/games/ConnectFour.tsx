import { useState } from "react";
import { Button } from "@/components/ui/button";
import GameLayout from "@/components/GameLayout";
import { useToast } from "@/hooks/use-toast";

const ConnectFour = () => {
  const [board, setBoard] = useState<(0 | 1 | 2)[][]>(
    Array(6).fill(0).map(() => Array(7).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<number | null>(null);
  const { toast } = useToast();

  const dropDisc = (col: number) => {
    if (winner) return;
    
    const newBoard = board.map(row => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (newBoard[row][col] === 0) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        
        if (checkWin(newBoard, row, col)) {
          setWinner(currentPlayer);
          toast({ title: `Player ${currentPlayer} wins!` });
        } else {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        return;
      }
    }
  };

  const checkWin = (b: (0 | 1 | 2)[][], row: number, col: number): boolean => {
    const player = b[row][col];
    const directions = [
      [[0, 1], [0, -1]],
      [[1, 0], [-1, 0]],
      [[1, 1], [-1, -1]],
      [[1, -1], [-1, 1]]
    ];

    for (const [dir1, dir2] of directions) {
      let count = 1;
      for (const [dr, dc] of [dir1, dir2]) {
        let r = row + dr, c = col + dc;
        while (r >= 0 && r < 6 && c >= 0 && c < 7 && b[r][c] === player) {
          count++;
          r += dr;
          c += dc;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const reset = () => {
    setBoard(Array(6).fill(0).map(() => Array(7).fill(0)));
    setCurrentPlayer(1);
    setWinner(null);
  };

  return (
    <GameLayout
      title="Connect Four"
      description="Connect four discs in a row before your opponent!"
      keywords={["connect four", "strategy", "board game", "logic"]}
      difficulty="medium"
      category="strategy"
      gameId="connect-four"
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {winner ? `Player ${winner} Wins!` : `Player ${currentPlayer}'s Turn`}
          </h2>
        </div>

        <div className="grid grid-cols-7 gap-2 bg-blue-600 p-4 rounded-lg">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => dropDisc(j)}
                className={`w-12 h-12 rounded-full ${
                  cell === 0 ? "bg-white" : cell === 1 ? "bg-red-500" : "bg-yellow-500"
                }`}
              />
            ))
          )}
        </div>

        <Button onClick={reset} variant="outline">New Game</Button>
      </div>
    </GameLayout>
  );
};

export default ConnectFour;
